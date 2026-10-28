// Name: Combined Motion Expansion
// ID: CombinedMotionExpansion
// Description: An integrated extension combining Expanded Motion and Added Motion blocks.
// By: NexusKitten & SharkPool (Combined by AI)

(function(Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Combined Motion Expansion must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;
  const TargetType = Scratch.TargetType;
  const Cast = Scratch.Cast;

  // Utility logic cloned from original implementation
  const Clone = {
    simple: function(obj) {
      if (obj === null || typeof obj !== 'object') return obj;
      return JSON.parse(JSON.stringify(obj));
    }
  };

  const blockSeparator = '<sep gap="36"/>';
  const rawXmlBlocks = `
<block type="CombinedMotionExpansion_rotationStyle"></block>
<block type="CombinedMotionExpansion_fence"></block>
<block type="CombinedMotionExpansion_steptowards">
    <value name="STEPS"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
    <value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_tweentowards">
    <value name="PERCENT"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
    <value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
</block>
${blockSeparator}
<block type="motion_turnrightaroundxy">
    <value name="DEGREES"><shadow type="math_number"><field name="NUM">15</field></shadow></value>
    <value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
</block>
<block type="motion_turnleftaroundxy">
    <value name="DEGREES"><shadow type="math_number"><field name="NUM">15</field></shadow></value>
    <value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
</block>
<block type="motion_ifonxybounce">
    <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_touchingxy">
    <value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
</block>
${blockSeparator}
<block type="CombinedMotionExpansion_touchingrect">
    <value name="X1"><shadow type="math_number"><field name="NUM">-100</field></shadow></value>
    <value name="Y1"><shadow type="math_number"><field name="NUM">-100</field></shadow></value>
    <value name="X2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
    <value name="Y2"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_setHome"></block>
<block type="CombinedMotionExpansion_gotoHome"></block>
<block type="CombinedMotionExpansion_moveinangledirection">
    <value name="STEPS"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
    <value name="DIRECTION"><shadow type="math_angle"><field name="NUM">90</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_randomcoordinate">
    <value name="MAXCHANGE"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
</block>
${blockSeparator}
<block type="CombinedMotionExpansion_moveSprite">
    <value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_moveSprite2">
    <value name="x"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
    <value name="y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_betterGlide">
    <value name="X"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="SECS"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_whileGlide">
    <value name="X"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
    <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="SECS"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_directSprite">
    <value name="ANGLE"><shadow type="math_angle"><field name="NUM">90</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_directSprite2">
    <value name="ANGLE"><shadow type="math_number"><field name="NUM">15</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_sizeSprite">
    <value name="SIZE"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
</block>
<block type="CombinedMotionExpansion_sizeSprite2">
    <value name="SIZE"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
</block>
`;
const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDQuMzU2IiBoZWlnaHQ9IjIwNC4zNTYiIHZpZXdCb3g9IjAgMCAyMDQuMzU2IDIwNC4zNTYiPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTOgMTAyLjE3OEMwIDQ1Ljc0NyA0NS43NDcgMCAxMDIuMTc4IDBzMTAyLjE3OCA0NS43NDggMTAyLjE3OCAxMDIuMTc4LTQ1Ljc0OCAxMDIuMTc4LTEwMi4xNzggMTAyLjE3OFMwIDE1OC42MDggMCAxMDIuMTc4IiBmaWxsPSIjMzY2YWIzIi8+PHBhdGggZD0iTTkuMDgzIDEwMi4xNzhjMC01MS40MTUgNDEuNjgtOTMuMDk1IDkzLjA5NS05My4wOTVzOTMuMDk1IDQxLjY4IDkzLjA5NSA5My4wOTUtNDEuNjggOTMu0OTUtOTMuMDk1IDkzLjA5NS05My4wOTUtNDEuNjgtOTMuMDk1LTkzLjA5NSIgZmlsbD0iIzRjOTdmZiIvPjxwYXRoIGQ9Ik0xMDIuMTc4IDE3OC44NjhjLTkuNjkgMC0xNy41NDYtMzQuMzM1LTY3LjU0Ni03Ni42OXM3Ljg1NS03Ni42OSAxNy41NDYtNzYuNjkgMTcuNTQ2IDMuMzM1IDE3LjU0NiA3Ni42OS03Ljg1NSA3Ni42OS0xNy41NDYgNzYuNjl6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xODMuMTE4IDEwMi4xNzhjMCA4LjU0LTM2LjI2NSAxNS40NjQtODEsMTUuNDY0cy04MS02LjkyNC04MS0xNS40NjQgMzYuMjY1LTE1LjQ2NCA4MS0xNS40NjQgODEgNi45MjQgODEgMTUuNDY0eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjUnLz48cGF0aCBkPSJNMTQyLjYwMSAxNDUuODRhMy4yNCAzLjI0IDAgMCAxLTIuMjktLjk0N0w1OS40NjUgNjQuMDQ0YTMuMjQgMy4yNCAwIDAgMSAwLTQuNTggMy4yNCAzLjI0IDAgMCAxIDQuNTggMGw4MC44NDYgODAuODQ2YTMuMjQgMy4yNCAwIDAgMS0yLjY5IDUuNTN6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNOTMuNDcgNzUuNjU0YzAgOS44MzktNy45NzYgMTcuODE1LTE3LjgxNSAxNy44MTVTNTcuODQgODUuNDkzIDU3LjA0IDc1LjY1NHM3Ljk3Ni0xNy44MTUgMTcuODE1LTE3LjgxNVM5My40NyA2NS44MTUgOTMuNDcgNzUuNjU0eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTkxIDExMi40MzJjLTkuNTc1LTIuMjYtMTUuNTA1LTExLjE1Ny0xMy4yNDQtMjEuNDMyIDIuMjYxLTkuNTc2IDExLjg1Ny0xNS41MDUgMjEuNDMyLTEzLjI0NCA5LjU3NiAyLjI2IDE1LjUwNiAxMS44NTYgMTMuMjQ1IDIxLjQzMlMxMDAuNTc2IDExNC42OTMgOTEgMTEyLjQzMnoiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZT0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMzIuMzQyIDExNC41MjRjMCA5LjgzOS03Ljk3OCAxNy44MTctMTcuODE3IDE3LjgxN3MtMTcuODE1LTcuOTc4LTE3LjgxNS0xNy44MTcgNy45NzYtMTcuODE1IDE3LjgxNS0xNy44MTUgMTcuODE3IDcuOTc5IDE3LjgxNyAxNy44MTV6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMTQyLjYwMSAxNDUuODRhMy4yNCAzLjI0IDAgMCAxLTIuMjktLjk0N2wtMTkuODQyLTE5Ljg0MmEzLjIzNiAzLjIzNiAwIDAgMSAwLTQuNTggMy4yNCAzLjI0IDAgMCAxIDQuNTggMGwxOS44NDIgMTkuODQxYTMuMjQgMy4yNCAwIDAgMSAwIDQuNTggMy4yNSAzLjI1IDAgMCAxLTIuMjkuOTQ4eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTE0Mi42MDEgMTQ1Ljg0YTMuMjQgMy4yNCAwIDAgMS0yLjI5LS45NDdMNTkuNDY1IDY0LjA0NGEzLjI0IDMuMjQgMCAwIDEgMC00LjU4IDMuMjQgMy4yNCAwIDAgMSA0LjU4IDBsODAuODQ2IDYwLjg0NmEzLjI0IDMuMjQgMCAwIDEtMi4yOSA1LjUzIiBmaWxsPSIjNGM5N2ZmIi8+PHBhdGggZD0iTTkzLjQ3IDc1LjY1NGMwIDkuODM5LTcuOTc2IDE3LjgxNS0xNy44MTUgMTcuODE1UzU3Ljg0IDg1LjQ5MyA1Ny44NCA3NS42NTRzNy45NzYtMTcuODE1IDE3LjgxNS0xNy44MTVTOTMuNDcgNjUuODE1IDkzLjQ3IDc1LjY1NCIgZmlsbD0iIzM2NmFiMyIvPjxwYXRoIGQ9Ik05MSAxMTIuNDMyYy05LjU3NS0yLjI2LTE1LjUwNS0xMS44NTctMTMuMjQ0LTIxLjQzMiAyLjYxLTkuNTc2IDExLjg1Ny0xNS41MDUgMjEuNDMyLTEzLjI0NCA5LjU3NiAyLjI2IDE1LjUwNiAxMS44NTYgMTMuMjQ1IDIxLjQzMlMxMDAuNTc2IDExNC42OTMgOTEgMTEyLjQzMiIgZmlsbD0iIzM2NmFiMyIvPjxwYXRoIGQ9Ik0xMzIuMzQyIDExNC41MjRjMCA5LjgzOS03Ljk3OCAxNy44MTctMTcuODE3IDE3LjgxN3MtMTcuODE1LTcuOTc4LTE3LjgxNS0xNy44MTcgNy45NzYtMTcuODE1IDE3LjgxNS0xNy44MTUgMTcuODE3IDcuOTc5IDE3LjgxNyAxNy44MTUiIGZpbGw9IiMzNjZhYjMiLz48cGF0aCBkPSJtMTQwLjMxMSAxNDQuODkzLTE5Ljg0Mi0xOS44NDJhMy4yMzYgMy4yMzYgMCAwIDEgMC00LjU4IDMuMjQgMy4yNCAwIDAgMSA0LjU4IDBsMTkuODQyIDE5Ljg0MWEzLjI0IDMuMjQgMCAwIDEgMCA0LjU4IDMuMjUgMy4yNSAwIDAgMS0yLjI5Ljk0OHMtMS42NTctLjMxNy0yLjI5LS45NDciIGZpbGw9IiMzNjZhYjMiLz48cGF0aCBkPSJNMTE1LjM0MyA2MS42NDFjMS44NSAxMS40NiAyLjkzOCAyNS40NDQgMi45MzggNDAuNTM3IDAgMTMuMDUyLS44MTMgMjUuMjc0LTIuMjMgMzUuNzUzIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xNTUuMDAyIDExMy45MDFjLTE0LjE4MyAyLjMzMS0zMi42NDEgMy43NC01Mi44MjQgMy43NC0xNS44MDcgMC0zMC41NTctLjg2NC00My4wMjMtMi4zNTkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTM3Ljc5NSAxMTIuNjg3YzAtNy4wMSA1LjY4Mi0xMi42OTMgMTIuNjkyLTEyLjY5M3MxMi42OTMgNS42ODMgMTIuNjkzIDEyLjY5My01LjY4MyAxMi42OTItMTIuNjkzIDEyLjY5Mi0xMi42OTItNS42ODMtMTIuNjkyLTEyLjY5MnptNjUuMjkxLTU4LjU3NmMwLTcuMDEgNS42ODItMTIuNjkyIDEyLjY5Mi0xMi42OTJzMTIuNjkzIDUuNjgyIDEyLjY5MyAxMi42OTItNS42ODMgMTIuNjkzLTEyLjY5MyAxMi42OTMtMTIuNjkyLTUuNjgzLTEyLjY5Mi0xMi42OTN6IiBmaWxsPSIjMzY2YWIzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjwvZz48L3N2Zz4=";
class CombinedMotionExpansion {
constructor(runtime) {
this.runtime = runtime;
this.spriteHomes = {};
this.cloneHomes = {};
}
deserialize(data) {
this.spriteHomes = data;
}
serialize() {
return this.filterHomes("sprite", this.spriteHomes);
}
filterHomes(type, homes) {
const newHomes = {};
for (const targetNameOrId in homes) {
let canCopy = true;
if (type === 'clone') {
if (!this.runtime.getTargetById(targetNameOrId)) canCopy = false;
} else {
if (!this.runtime.getSpriteTargetByName(targetNameOrId)) canCopy = false;
}
if (canCopy) {
newHomes[targetNameOrId] = homes[targetNameOrId];
}
}
return newHomes;
}
_getTargets(enable) {
const spriteNames = [];
if (enable) spriteNames.push({ text: "myself", value: "myself" });
const targets = runtime.targets;
for (let index = 1; index < targets.length; index++) {
const target = targets[index];
if (target.isOriginal) {
const targetName = target.getName();
spriteNames.push({ text: targetName, value: targetName });
}
}
return spriteNames.length > 0 ? spriteNames : [""];
}
orderCategoryBlocks(extensionBlocks) {
if (typeof vm !== "undefined" && vm.editingTarget && vm.editingTarget.isStage) {
return [<label text="Stage selected: no motion blocks"></label>];
}
let categoryBlocks = rawXmlBlocks;
let idx = 0;
for (const block of extensionBlocks) {
categoryBlocks = categoryBlocks.replace('%block' + idx + '>', block);
idx++;
}
return [categoryBlocks];
}
getInfo() {
return {
id: 'CombinedMotionExpansion',
name: 'Combined Motion',
color1: '#4C97FF',
color2: '#4280D7',
color3: '#3373CC',
menuIconURI,
isDynamic: true,
orderBlocks: this.orderCategoryBlocks,
blocks: [
// Original pmMotionExpansion Blocks
{
opcode: "rotationStyle",
blockType: BlockType.REPORTER,
text: "rotation style",
disableMonitor: true,
},
{
opcode: "fence",
blockType: BlockType.COMMAND,
text: "manually fence",
},
{
opcode: "steptowards",
blockType: BlockType.COMMAND,
text: "move [STEPS] steps towards x: [X] y: [Y]",
arguments: {
STEPS: { type: ArgumentType.NUMBER, defaultValue: "10" },
X: { type: ArgumentType.NUMBER, defaultValue: "0" },
Y: { type: ArgumentType.NUMBER, defaultValue: "0" },
},
switches: [{ isNoop: true }, "tweentowards"],
switchText: "move steps towards xy"
},
{
opcode: "tweentowards",
blockType: BlockType.COMMAND,
text: "move [PERCENT]% of the way to x: [X] y: [Y]",
arguments: {
PERCENT: { type: ArgumentType.NUMBER, defaultValue: "10" },
X: { type: ArgumentType.NUMBER, defaultValue: "0" },
Y: { type: ArgumentType.NUMBER, defaultValue: "0" },
},
switches: ["steptowards", { isNoop: true }],
switchText: "move _% of the way to xy"
},
{
opcode: "touchingxy",
blockType: BlockType.BOOLEAN,
text: "touching x: [X] y: [Y]?",
arguments: {
X: { type: ArgumentType.NUMBER, defaultValue: "0" },
Y: { type: ArgumentType.NUMBER, defaultValue: "0" },
},
switches: [{ isNoop: true }, "touchingrect"],
switchText: "touching xy"
},
{
opcode: "touchingrect",
blockType: BlockType.BOOLEAN,
text: "touching rectangle x1: [X1] y1: [Y1] x2: [X2] y2: [Y2]?",
arguments: {
X1: { type: ArgumentType.NUMBER, defaultValue: "-100" },
Y1: { type: ArgumentType.NUMBER, defaultValue: "-100" },
X2: { type: ArgumentType.NUMBER, defaultValue: "100" },
Y2: { type: ArgumentType.NUMBER, defaultValue: "100" },
},
switches: ["touchingxy", { isNoop: true }],
switchText: "touching rectangle"
},
{
opcode: "setHome",
blockType: BlockType.COMMAND,
text: "set my home",
switches: [{ isNoop: true }, "gotoHome"]
},
{
opcode: "gotoHome",
blockType: BlockType.COMMAND,
text: "go to home",
switches: ["setHome", { isNoop: true }]
},
// Original SPaddedmotion Blocks
{
opcode: "moveinangledirection",
blockType: BlockType.COMMAND,
text: "move [NAME] [STEPS] steps towards direction [DIRECTION]",
filter: [TargetType.SPRITE],
arguments: {
STEPS: { type: ArgumentType.NUMBER, defaultValue: 10 },
DIRECTION: { type: ArgumentType.ANGLE, defaultValue: 90 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS2" }
}
},
{
opcode: "randomcoordinate",
blockType: BlockType.REPORTER,
text: "random [COORDINATE] with max change [MAXCHANGE] in [STAGE] stage",
arguments: {
COORDINATE: { type: ArgumentType.STRING, menu: "COORDINATE" },
MAXCHANGE: { type: ArgumentType.NUMBER, defaultValue: 50 },
STAGE: { type: ArgumentType.STRING, menu: "STAGE" }
}
},
{ blockType: BlockType.LABEL, text: "Sprite Controlling" },
{
opcode: "moveSprite",
blockType: BlockType.COMMAND,
text: "set [NAME] position to x [x] y [y]",
arguments: {
x: { type: ArgumentType.NUMBER, defaultValue: 0 },
y: { type: ArgumentType.NUMBER, defaultValue: 0 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS" }
}
},
{
opcode: "moveSprite2",
blockType: BlockType.COMMAND,
text: "change [NAME] position by x [x] y [y]",
arguments: {
x: { type: ArgumentType.NUMBER, defaultValue: 10 },
y: { type: ArgumentType.NUMBER, defaultValue: 0 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS" }
}
},
{
opcode: "betterGlide",
blockType: BlockType.COMMAND,
text: "glide [NAME] [SECS] secs to x: [X] y: [Y]",
filter: [TargetType.SPRITE],
arguments: {
X: { type: ArgumentType.NUMBER, defaultValue: 100 },
Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
SECS: { type: ArgumentType.NUMBER, defaultValue: 1 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS2" }
}
},
{
opcode: "whileGlide",
blockType: BlockType.LOOP,
text: "while gliding [NAME] [SECS] secs to x: [X] y: [Y] run",
filter: [TargetType.SPRITE],
arguments: {
X: { type: ArgumentType.NUMBER, defaultValue: 100 },
Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
SECS: { type: ArgumentType.NUMBER, defaultValue: 1 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS2" }
}
},
{
opcode: "directSprite",
blockType: BlockType.COMMAND,
text: "set [NAME] direction to [ANGLE]",
arguments: {
ANGLE: { type: ArgumentType.ANGLE, defaultValue: 90 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS" }
}
},
{
opcode: "directSprite2",
blockType: BlockType.COMMAND,
text: "change [NAME] direction by [ANGLE] degrees",
arguments: {
ANGLE: { type: ArgumentType.ANGLE, defaultValue: 15 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS" }
}
},
{
opcode: "sizeSprite",
blockType: BlockType.COMMAND,
text: "set [NAME] size to [SIZE]",
arguments: {
SIZE: { type: ArgumentType.NUMBER, defaultValue: 100 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS" }
}
},
{
opcode: "sizeSprite2",
blockType: BlockType.COMMAND,
text: "change [NAME] size by [SIZE]",
arguments: {
SIZE: { type: ArgumentType.NUMBER, defaultValue: 10 },
NAME: { type: ArgumentType.STRING, menu: "TARGETS" }
}
}
],
menus: {
COORDINATE: ["x", "y"],
STAGE: ["freeroam", "boxed"],
TARGETS: {
acceptReporters: true,
items: "_getTargetsMenuFalse",
},
TARGETS2: {
acceptReporters: true,
items: "_getTargetsMenuTrue",
}
}
};
}
_getTargetsMenuFalse() { return this._getTargets(false); }
_getTargetsMenuTrue() { return this._getTargets(true); }
// Combined Block Functions Execution Logic
rotationStyle(_, util) {
return util.target.rotationStyle;
}
fence(_, util) {
const newpos = this.runtime.renderer.getFencedPositionOfDrawable(
util.target.drawableID,
[util.target.x, util.target.y]
);
util.target.setXY(newpos[0], newpos[1]);
}
steptowards(args, util) {
const x = Cast.toNumber(args.X);
const y = Cast.toNumber(args.Y);
const steps = Cast.toNumber(args.STEPS);
const val = steps / Math.sqrt((x - util.target.x) ** 2 + (y - util.target.y) ** 2);
if (val >= 1) {
util.target.setXY(x, y);
} else {
util.target.setXY(
(x - util.target.x) * val + util.target.x,
(y - util.target.y) * val + util.target.y
);
}
}
tweentowards(args, util) {
const x = Cast.toNumber(args.X);
const y = Cast.toNumber(args.Y);
const val = Cast.toNumber(args.PERCENT);
util.target.setXY(
(x - util.target.x) * (val / 100) + util.target.x,
(y - util.target.y) * (val / 100) + util.target.y
);
}
touchingrect(args, util) {
let left = Cast.toNumber(args.X1);
let right = Cast.toNumber(args.X2);
let bottom = Cast.toNumber(args.Y1);
let top = Cast.toNumber(args.Y2);
if (left > right) { let temp = left; left = right; right = temp; }
if (bottom > top) { let temp = bottom; bottom = top; top = temp; }
const drawable = this.runtime.renderer._allDrawables[util.target.drawableID];
if (!drawable) return false;
const drawableBounds = drawable.getFastBounds();
drawableBounds.snapToInt();
const Rectangle = this.runtime.renderer.exports.Rectangle;
const containsBounds = new Rectangle();
containsBounds.initFromBounds(left, right, bottom, top);
containsBounds.snapToInt();
if (!containsBounds.intersects(drawableBounds)) return false;
drawable.updateCPURenderAttributes();
const intersectingBounds = Rectangle.intersect(drawableBounds, containsBounds);
for (let x = intersectingBounds.left; x < intersectingBounds.right; x++) {
for (let y = intersectingBounds.bottom; y < intersectingBounds.top; y++) {
if (drawable.isTouching([x, y])) return true;
}
}
return false;
}
touchingxy(args, util) {
const x = Cast.toNumber(args.X);
const y = Cast.toNumber(args.Y);
const drawable = this.runtime.renderer._allDrawables[util.target.drawableID];
if (!drawable) return false;
drawable.updateCPURenderAttributes();
return drawable.isTouching([x, y]);
}
setHome(_, util) {
const target = util.target;
if (target.isStage) return;
const savedState = {
x: target.x,
y: target.y,
size: target.size,
stretch: Clone.simple(target.stretch),
transform: Clone.simple(target.transform),
direction: target.direction,
rotationStyle: target.rotationStyle,
visible: target.visible,
effects: Clone.simple(target.effects),
draggable: target.draggable,
currentCostume: target.currentCostume,
tintColor: target.tintColor,
volume: target.volume
};
if (target.isOriginal) {
const name = target.getName();
this.spriteHomes[name] = savedState;
this.spriteHomes = this.filterHomes("sprite", this.spriteHomes);
return;
}
this.cloneHomes[target.id] = savedState;
this.cloneHomes = this.filterHomes("clone", this.cloneHomes);
}
gotoHome(_, util) {
const target = util.target;
if (target.isStage) return;
const identifier = target.isOriginal ? target.getName() : target.id;
const homeTable = target.isOriginal ? this.spriteHomes : this.cloneHomes;
if (!(identifier in homeTable)) return;
const homeState = homeTable[identifier];
if (!homeState) return;
target.setXY(homeState.x, homeState.y);
target.setSize(homeState.size);
if (homeState.stretch) target.setStretch(...homeState.stretch);
if (homeState.transform) {
target.transform[0] = homeState.transform[0];
target.transform[1] = homeState.transform[1];
}
target.setDirection(homeState.direction);
target.setRotationStyle(homeState.rotationStyle);
target.setVisible(homeState.visible);
if (homeState.effects) {
for (const effectName in homeState.effects) {
target.setEffect(effectName, homeState.effects[effectName]);
}
}
target.setDraggable(homeState.draggable);
target.setCostume(homeState.currentCostume);
target.tintColor = homeState.tintColor;
target.volume = homeState.volume;
this.runtime.requestRedraw();
}
moveSprite(args) {
let target = runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
target.setXY(Cast.toNumber(args.x), Cast.toNumber(args.y));
}
moveSprite2(args) {
let target = runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
target.setXY(target.x + Cast.toNumber(args.x), target.y + Cast.toNumber(args.y));
}
directSprite(args) {
let target = runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
target.setDirection(Cast.toNumber(args.ANGLE));
}
directSprite2(args) {
let target = runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
target.setDirection(target.direction + Cast.toNumber(args.ANGLE));
}
sizeSprite(args) {
let target = runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
target.setSize(Cast.toNumber(args.SIZE));
}
sizeSprite2(args) {
let target = runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
target.setSize(target.size + Cast.toNumber(args.SIZE));
}
moveinangledirection(args, util) {
const steps = -Cast.toNumber(args.STEPS);
const direction = Cast.toNumber(args.DIRECTION);
const radians = (Math.PI / 180) * ((direction + 90) * -1);
const deltaX = steps * Math.cos(radians);
const deltaY = steps * Math.sin(radians);
if (args.NAME === "myself") {
util.target.setXY(util.target.x + deltaX, util.target.y + deltaY);
} else {
let target = runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
target.setXY(target.x + deltaX, target.y + deltaY);
}
}
randomcoordinate(args, util) {
const maxChange = Cast.toNumber(args.MAXCHANGE) + 1;
let coordVal = util.target[args.COORDINATE];
const randomChange = Math.floor(Math.random() * maxChange);
const sign = Math.random() < 0.5 ? -1 : 1;
if (args.STAGE === "freeroam") coordVal += sign * randomChange;
else if (args.STAGE === "boxed") {
coordVal += sign * randomChange;
coordVal = Math.min(args.COORDINATE === "x" ? runtime.stageWidth : runtime.stageHeight, Math.abs(coordVal)) * sign;
}
return coordVal;
}
betterGlide(args, util, loop) {
let target = args.NAME === "myself" ? util.target : runtime.getSpriteTargetByName(args.NAME);
if (!target) target = runtime.getTargetById(args.NAME);
if (!target) return;
if (!util.stackFrame.startTime) {
util.stackFrame.startTime = new Date().getTime();
util.stackFrame.duration = Cast.toNumber(args.SECS);
util.stackFrame.startX = target.x;
util.stackFrame.startY = target.y;
util.stackFrame.endX = Cast.toNumber(args.X);
util.stackFrame.endY = Cast.toNumber(args.Y);
if (util.stackFrame.duration <= 0) {
target.setXY(util.stackFrame.endX, util.stackFrame.endY);
return;
}
if (loop === "on") util.startBranch(1, true);
else util.yield();
} else {
const timeElapsed = new Date().getTime() - util.stackFrame.startTime;
if (timeElapsed < util.stackFrame.duration * 1000) {
const frac = timeElapsed / (util.stackFrame.duration * 1000);
const dx = frac * (util.stackFrame.endX - util.stackFrame.startX);
const dy = frac * (util.stackFrame.endY - util.stackFrame.startY);
target.setXY(util.stackFrame.startX + dx, util.stackFrame.startY + dy);
if (loop === "on") util.startBranch(1, true);
else util.yield();
} else {
target.setXY(util.stackFrame.endX, util.stackFrame.endY);
}
}
}
whileGlide(args, util) { this.betterGlide(args, util, "on"); }
}
Scratch.extensions.register(new CombinedMotionExpansion());
})(Scratch);
