const chunks = new Array(worldChunksCount);

{
const mapText0_0 = 
"\
gggggggggggggggg\
..ddddddddddd..d\
....ddddd......d\
.....dd.........\
................\
....sss..sss....\
....s.s..s.s....\
....s.s..s.s....\
....s.s..s.s....\
....s.s..s.s....\
....sss..sss....\
................\
...............d\
...............d\
..d.dddddddddddd\
.dd.dddddddddddd";

const mapText1_0 =
"\
dddddddddddddddd\
d...............\
d...............\
................\
................\
.....s...sss....\
....ss...s.s....\
.....s...s.s....\
.....s...s.s....\
.....s...s.s....\
....sss..sss....\
................\
................\
d...............\
d...............\
dddddddddddddddd";

const mapText0_1 =
"\
.dd.dddddddddddd\
................\
................\
................\
................\
....sss...s.....\
....s.s..ss.....\
....s.s...s.....\
....s.s...s.....\
....s.s...s.....\
....sss..sss....\
................\
................\
................\
................\
dddddddddddddddd";

const mapText1_1 =
"\
dddddddddddddddd\
d...............\
d...............\
................\
................\
d....s....s.....\
d...ss...ss.....\
.....s....s.....\
.....s....s.....\
.....s....s.....\
....sss..sss....\
................\
................\
d...............\
d...............\
dddddddddddddddd";

chunks[0] = chunkByText(mapText0_0);
chunks[1] = chunkByText(mapText1_0);
chunks[2] = chunkByText(mapText0_1);
chunks[3] = chunkByText(mapText1_1);
}

async function loadFile(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text;
}
