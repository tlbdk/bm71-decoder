#include <stdlib.h>
#include <assert.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

static const char *testdata_hex =
	"aa001e7000012730bb4ce9731302011a020a080cff4c0010073f1f7d9e650118c648"
	"aa000b7004012730bb4ce97300c600"
	"aa002a7003018bb2d6e54a3c1f1eff060001092002c370885c7b74bfeb1523b70c1cdd8f6c0fc1f1d40464fbae31"
	"aa0029700001789c482c62611e0201061aff4c000c0e00844861db7a0681c1c8527e938610054a1cfade6dad8d"
	"aa00197000019f66173bf6740e0201060aff4c001005411c38492ba388"
	"aa0025700000c2b94a29e8181a02010611061745561073ed09a6b34e7ce552"
	"aa001d700400c2b94a29e8181209162a2518e8294ab9c107161820c0a8fe32ba6d"
	"aa002a700301b18b5a325b061f02011a03036ffd17166ffd037e630c6dc980d348892ff5a591d2c91ba49c91bc0b"
	"aa00117000011bfb7848e20806c29584481877bc40"
	"aa000b700401b0a729b9cb5c00a977"
	"aa000b700401c2958448187700a925"
	"aa00117000013858eb15735806789c482c6261b022"
	"aa0028700000bf8a7992bf701d02011a07030f180a18fffe11094a616272612045766f6c766520373565ab34"
	"aa0011700001e1b16801114b068b47b9c9c77eb2d6"
	"aa001c700001321b54f0d7441102011a020a0c0aff4c0010050318bcefc9a2e6"
	"aa00277002014a4e52d342601c03039ffe17169ffe02517a663344714c63775573000001797f7452e2a62e"
	"aa00157004014a4e52d342600a09ffe00006eaca7d3104a514"
	"aa0011700000a23595d0b69c06020102020a02b91f"
	"aa0018700400a23595d0b69c0d0c09736b6e2d6c6170746f7000b902"
	"aa001c700001bb511c0424611102011a020a0c0aff4c0010051b1c81ee0fa5b8"
	"aa0027700300b2f560a468381c1bff750042040180603868a460f5b23a68a460f5b101000000000000a30e"
	"aa002a7003010a3b6e7d97791f1eff060001092006d25714f5a92cbdf7a4f83366af"
	"aa002a700301c3cef39ce04a1f1eff060001092002b9e376356cb0e07a89b57fdc49b0ddbe226d1ff2c5e52fa1a6"
	"aa001c70000122b76024935b1102011a020a0c0aff4c0010051e18ed1b80a218";

static const unsigned char *hex2buf(const char *string)
{
	if (string == NULL)
		return NULL;

	size_t slength = strlen(string);
	if ((slength % 2) != 0) // must be even
		return NULL;

	size_t dlength = slength / 2;

	uint8_t *data = malloc(dlength);
	memset(data, 0, dlength);

	size_t index = 0;
	while (index < slength) {
		char c = string[index];
		int value = 0;
		if (c >= '0' && c <= '9')
			value = (c - '0');
		else if (c >= 'A' && c <= 'F')
			value = (10 + (c - 'A'));
		else if (c >= 'a' && c <= 'f')
			value = (10 + (c - 'a'));
		else {
			free(data);
			return NULL;
		}

		data[(index / 2)] += value << (((index + 1) % 2) * 4);

		index++;
	}

	return data;
}

static int calc_checksum(const unsigned char *data, size_t length)
{
	int checksum = 0;
	unsigned int i;
	for (i = 0; i < length; i++) {
		checksum += data[i];
	}
	checksum = ~checksum;
	checksum += 1;
	return checksum & 0xff;
}

static int find_start(const unsigned char *data, size_t length)
{
	unsigned int i;
	for (i = 0; i < length; i++) {
		if (data[i] == 0xAA) {
			return i;
		}
	}
	return -1;
}

static void print_advertising_report(const unsigned char *data,
				     unsigned int length)
{
	if (length < 5) {
		return;
	}

	int j;

	printf("MAC address: ");
	for (j = 0; j < 6; j++) {
		if (j == 5)
			printf("%02x", data[6 + j]);
		else
			printf("%02x:", data[6 + j]);
	}
	printf("\n");
}

static int print_event(const unsigned char *data, size_t length)
{
	int offset;
	int next_offset;
	unsigned int event_length;
	unsigned char event_chksum;
	unsigned char calc_chksum;

	assert(data);
	assert(length);

	// find start of next event
	offset = find_start(data, length);

	// consume data and wait for more if we can't find start
	if (offset == -1) {
		return length;
	}

	// calculate new length
	length = length - offset;

	// return if we don't have enough for the smallest event
	if (length < 5) {
		return offset;
	}

	// move data forward to start of event
	data = data + offset;

	// read 16bit big endianess
	event_length = (int)(data[1] << 8 | data[2]);

	// validate event_length
	if (event_length == 0) {
		// Skip to next event or consume length
		next_offset = find_start(data + 1, length - 1);
		if (next_offset == -1) {
			return offset + length;
		}
		return next_offset;
	}

	// not enough data wait for more
	if (event_length + 3 > length) {
		return offset;
	}

	// validate checksum
	event_chksum = data[offset + event_length + 3];
	calc_chksum = calc_checksum(data + offset + 1, event_length + 2);
	if (event_chksum != calc_chksum) {
		// Skip to next event or consume length
		next_offset = find_start(data + 1, length - 1);
		if (next_offset == -1) {
			return offset + length;
		}
		return next_offset;
	}

	switch (data[3]) {
	case 0x70:
		print_advertising_report(data, length);
		break;
	}

	return offset + event_length + 4;
}

int main(void)
{
	unsigned char buf[4096];
	size_t length = 0;
	int testdata_offset = 0;
	int offset = 0;

	const unsigned char *testdata = hex2buf(testdata_hex);

	memset(buf, 0, 4096);

	printf("Start parsing\n");
	while (1) {
		// simulate reading data
		memcpy(buf + offset, testdata + testdata_offset, 40);
		testdata_offset += 40;
		length += 40;

		printf("length %zu\n", length);

		// parse events in buffer
		offset = print_event(buf + offset, length);

		if (offset > 0) {
			// move to start of buf and zero rest
			memcpy(buf, buf + offset, length - offset);
			memset(buf + offset, 0, 4096 - offset);
			length -= offset;
			offset = 0;
		}

		sleep(1);
	}
}
