// Name: Motion Galore
// ID: maxuMotion
// Description: New Motion related Blocks!
// By: Maxujakku

//  Version 1.0

(function(Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Motion galore must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDQuMzU2IiBoZWlnaHQ9IjIwNC4zNTYiIHZpZXdCb3g9IjAgMCAyMDQuMzU2IDIwNC4zNTYiPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTAgMTAyLjE3OEMwIDQ1Ljc0NyA0NS43NDcgMCAxMDIuMTc4IDBzMTAyLjE3OCA0NS43NDggMTAyLjE3OCAxMDIuMTc4LTQ1Ljc0OCAxMDIuMTc4LTEwMi4xNzggMTAyLjE3OFMwIDE1OC42MDggMCAxMDIuMTc4IiBmaWxsPSIjMzY2YWIzIi8+PHBhdGggZD0iTTkuMDgzIDEwMi4xNzhjMC01MS40MTUgNDEuNjgtOTMuMDk1IDkzLjA5NS05My4wOTVzOTMuMDk1IDQxLjY4IDkzLjA5NSA5My4wOTUtNDEuNjggOTMuMDk1LTkzLjA5NSA5My4wOTUtOTMuMDk1LTQxLjY4LTkzLjA5NS05My4wOTUiIGZpbGw9IiM0Yzk3ZmYiLz48cGF0aCBkPSJNMTAyLjE3OCAxNzguODY4Yy05LjY5IDAtMTcuNTQ2LTM0LjMzNS0xNy41NDYtNzYuNjlzNy44NTUtNzYuNjkgMTcuNTQ2LTc2LjY5IDE3LjU0NiAzNC4zMzUgMTcuNTQ2IDc2LjY5LTcuODU1IDc2LjY5LTE3LjU0NiA3Ni42OXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTE4My4xNzggMTAyLjE3OGMwIDguNTQtMzYuMjY1IDE1LjQ2NC04MSAxNS40NjRzLTgxLTYuOTI0LTgxLTE1LjQ2NCAzNi4yNjUtMTUuNDY0IDgxLTE1LjQ2NCA4MSA2LjkyNCA4MSAxNS40NjR6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xNDIuNjAxIDE0NS44NGEzLjI0IDMuMjQgMCAwIDEtMi4yOS0uOTQ3TDU5LjQ2NSA2NC4wNDRhMy4yNCAzLjI0IDAgMCAxIDAtNC41OCAzLjI0IDMuMjQgMCAwIDEgNC41OCAwbDgwLjg0NiA4MC44NDZhMy4yNCAzLjI0IDAgMCAxLTIuMjkgNS41M3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik05My40NyA3NS42NTRjMCA5LjgzOS03Ljk3NiAxNy44MTUtMTcuODE1IDE3LjgxNVM1Ny44NCA4NS40OTMgNTcuODQgNzUuNjU0czcuOTc2LTE3LjgxNSAxNy44MTUtMTcuODE1UzkzLjQ3IDY1LjgxNSA5My40NyA3NS42NTR6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNOTEgMTEyLjQzMmMtOS41NzUtMi4yNi0xNS41MDUtMTEuODU3LTEzLjI0NC0yMS40MzIgMi4yNjEtOS41NzYgMTEuODU3LTE1LjUwNSAyMS40MzItMTMuMjQ0IDkuNTc2IDIuMjYgMTUuNTA2IDExLjg1NiAxMy4yNDUgMjEuNDMyUzEwMC41NzYgMTE0LjY5MyA5MSAxMTIuNDMyeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTEzMi4zNDIgMTE0LjUyNGMwIDkuODM5LTcuOTc4IDE3LjgxNy0xNy44MTcgMTcuODE3cy0xNy44MTUtNy45NzgtMTcuODE1LTE3LjgxNyA3Ljk3Ni0xNy44MTUgMTcuODE1LTE3LjgxNSAxNy44MTcgNy45NzkgMTcuODE3IDE3LjgxNXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0xNDIuNjAxIDE0NS44NGEzLjI0IDMuMjQgMCAwIDEtMi4yOS0uOTQ3bC0xOS44NDItMTkuODQyYTMuMjM2IDMuMjM2IDAgMCAxIDAtNC41OCAzLjI0IDMuMjQgMCAwIDEgNC41OCAwbDE5Ljg0MiAxOS44NDFhMy4yNCAzLjI0IDAgMCAxIDAgNC41OCAzLjI1IDMuMjUgMCAwIDEtMi4yOS45NDh6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMTQyLjYwMSAxNDUuODRhMy4yNCAzLjI0IDAgMCAxLTIuMjktLjk0N0w1OS40NjUgNjQuMDQ0YTMuMjQgMy4yNCAwIDAgMSAwLTQuNTggMy4yNCAzLjI0IDAgMCAxIDQuNTggMGw4MC44NDYgODAuODQ2YTMuMjQgMy4yNCAwIDAgMS0yLjI5IDUuNTMiIGZpbGw9IiM0Yzk3ZmYiLz48cGF0aCBkPSJNOTMuNDcgNzUuNjU0YzAgOS44MzktNy45NzYgMTcuODE1LTE3LjgxNSAxNy44MTVTNTcuODQgODUuNDkzIDU3Ljg0IDc1LjY1NHM3Ljk3Ni0xNy44MTUgMTcuODE1LTE3LjgxNVM5My40NyA2NS44MTUgOTMuNDcgNzUuNjU0IiBmaWxsPSIjMzY2YWIzIi8+PHBhdGggZD0iTTkxIDExMi40MzJjLTkuNTc1LTIuMjYtMTUuNTA1LTExLjg1Ny0xMy4yNDQtMjEuNDMyIDIuMjYxLTkuNTc2IDExLjg1Ny0xNS41MDUgMjEuNDMyLTEzLjI0NCA5LjU3NiAyLjI2IDE1LjUwNiAxMS44NTYgMTMuMjQ1IDIxLjQzMlMxMDAuNTc2IDExNC42OTMgOTEgMTEyLjQzMiIgZmlsbD0iIzM2NmFiMyIvPjxwYXRoIGQ9Ik0xMzIuMzQyIDExNC41MjRjMCA5LjgzOS03Ljk3OCAxNy44MTctMTcuODE3IDE3LjgxN3MtMTcuODE1LTcuOTc4LTE3LjgxNS0xNy44MTcgNy45NzYtMTcuODE1IDE3LjgxNS0xNy44MTUgMTcuODE3IDcuOTc5IDE3LjgxNyAxNy44MTUiIGZpbGw9IiMzNjZhYjMiLz48cGF0aCBkPSJtMTQwLjMxMSAxNDQuODkzLTE5Ljg0Mi0xOS44NDJhMy4yMzYgMy4yMzYgMCAwIDEgMC00LjU4IDMuMjQgMy4yNCAwIDAgMSA0LjU4IDBsMTkuODQyIDE5Ljg0MWEzLjI0IDMuMjQgMCAwIDEgMCA0LjU4IDMuMjUgMy4yNSAwIDAgMS0yLjI5Ljk0OHMtMS42NTctLjMxNy0yLjI5LS45NDciIGZpbGw9IiMzNjZhYjMiLz48cGF0aCBkPSJNMTE1LjM0MyA2MS42NDFjMS44NSAxMS40NiAyLjkzOCAyNS40NDQgMi45MzggNDAuNTM3IDAgMTMuMDUyLS44MTMgMjUuMjc0LTIuMjMgMzUuNzUzIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xNTUuMDAyIDExMy45MDFjLTE0LjE4MyAyLjMzMS0zMi42NDEgMy43NC01Mi44MjQgMy43NC0xNS44MDcgMC0zMC41NTctLjg2NC00My4wMjMtMi4zNTkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTM3Ljc5NSAxMTIuNjg3YzAtNy4wMSA1LjY4Mi0xMi42OTMgMTIuNjkyLTEyLjY5M3MxMi42OTMgNS42ODMgMTIuNjkzIDEyLjY5My01LjY4MyAxMi42OTItMTIuNjkzIDEyLjY5Mi0xMi42OTItNS42ODMtMTIuNjkyLTEyLjY5MnptNjUuMjkxLTU4LjU3NmMwLTcuMDEgNS42ODItMTIuNjkyIDEyLjY5Mi0xMi42OTJzMTIuNjkzIDUuNjgyIDEyLjY5MyAxMi42OTItNS42ODMgMTIuNjkzLTEyLjY5MyAxMi42OTMtMTIuNjkyLTUuNjgzLTEyLjY5Mi0xMi42OTN6IiBmaWxsPSIjMzY2YWIzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjwvZz48L3N2Zz4=";

  class MaxuMotion {
    getInfo() {
      return {
        id: "maxuMotion",
        name: "Motion Galore",
        color1: "#4c97ff",
        color2: "#3373cc",
        menuIconURI,
        blocks: [
          {
            opcode: "moveinangledirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "move [NAME] [STEPS] steps towards direction [DIRECTION]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              DIRECTION: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          {
            opcode: "rotateStyle",
            blockType: Scratch.BlockType.REPORTER,
            text: "rotation style",
            filter: [Scratch.TargetType.SPRITE]
          },
          "---",
          {
            opcode: "randomcoordinate",
            blockType: Scratch.BlockType.REPORTER,
            text: "random [COORDINATE] with max change [MAXCHANGE] in [STAGE] stage",
            arguments: {
              COORDINATE: { type: Scratch.ArgumentType.STRING, menu: "COORDINATE" },
              MAXCHANGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              STAGE: { type: Scratch.ArgumentType.STRING, menu: "STAGE" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Sprite Controlling" },
          {
            opcode: "moveSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [NAME] position to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "moveSprite2",
            blockType: Scratch.BlockType.COMMAND,
            text: "change [NAME] position by x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          "---",
          {
            opcode: "betterGlide",
            blockType: Scratch.BlockType.COMMAND,
            text: "glide [NAME] [SECS] secs to x: [X] y: [Y]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              SECS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          {
            opcode: "whileGlide",
            blockType: Scratch.BlockType.LOOP,
            text: "while gliding [NAME] [SECS] secs to x: [X] y: [Y] run",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              SECS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          "---",
          {
            opcode: "directSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [NAME] direction to [ANGLE]",
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "directSprite2",
            blockType: Scratch.BlockType.COMMAND,
            text: "change [NAME] direction by [ANGLE] degrees",
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 15 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          "---",
          {
            opcode: "sizeSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [NAME] size to [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "sizeSprite2",
            blockType: Scratch.BlockType.COMMAND,
            text: "change [NAME] size by [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              NAME: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
              opcode: "rotationStyle",
              blockType: Scratch.BlockType.REPORTER,
              text: "rotation style",
              disableMonitor: true,
          },
          {
              opcode: "fence",
              blockType: Scratch.BlockType.COMMAND,
              text: "manually fence",
          },
          {
              opcode: "steptowards",
              blockType: Scratch.BlockType.COMMAND,
              text: "move [STEPS] steps towards x: [X] y: [Y]",
              arguments: {
                  STEPS: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "10",
                  },
                  X: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "0",
                  },
                  Y: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "0",
                  },
              },
              switches: [
                  { isNoop: true },
                  "tweentowards"
              ],
              switchText: "move steps towards xy"
          },
          {
              opcode: "tweentowards",
              blockType: Scratch.BlockType.COMMAND,
              text: "move [PERCENT]% of the way to x: [X] y: [Y]",
              arguments: {
                  PERCENT: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "10",
                  },
                  X: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "0",
                  },
                  Y: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "0",
                  },
              },
              switches: [
                  "steptowards",
                  { isNoop: true },
              ],
              switchText: "move _% of the way to xy"
          },
          {
              opcode: "touchingxy",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "touching x: [X] y: [Y]?",
              arguments: {
                  X: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "0",
                  },
                  Y: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "0",
                  },
              },
              switches: [
                  { isNoop: true },
                  "touchingrect"
              ],
              switchText: "touching xy"
          },
          {
              opcode: "touchingrect",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "touching rectangle x1: [X1] y1: [Y1] x2: [X2] y2: [Y2]?",
              arguments: {
                  X1: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "-100",
                  },
                  Y1: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "-100",
                  },
                  X2: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "100",
                  },
                  Y2: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: "100",
                  },
              },
              switches: [
                  "touchingxy",
                  { isNoop: true },
              ],
              switchText: "touching rectangle"
          },
          {
              opcode: "setHome",
              blockType: Scratch.BlockType.COMMAND,
              text: "set my home",
              switches: [
                  { isNoop: true },
                  "gotoHome"
              ]
          },
          {
              opcode: "gotoHome",
              blockType: Scratch.BlockType.COMMAND,
              text: "go to home",
              switches: [
                  "setHome",
                  { isNoop: true }
              ]
          },
        ],
        menus: {
          COORDINATE: ["x", "y"],
          STAGE: ["freeroam", "boxed"],
          TARGETS: {
            acceptReporters: true,
            items: this._getTargets(false),
          },
          TARGETS2: {
            acceptReporters: true,
            items: this._getTargets(true),
          },
        }
      };
    }

    // Helper Funcs
    _getTargets(enable) {
      const spriteNames = [];
      if (enable) spriteNames.push({ text: "myself", value: "_myself_" });
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

    // Block Funcs
    moveSprite(args) {
      let target = runtime.getSpriteTargetByName(args.NAME);
      if (!target) target = runtime.getTargetById(args.NAME);
      if (!target) return;
      target.setXY(Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y));
    }

    moveSprite2(args) {
      let target = runtime.getSpriteTargetByName(args.NAME);
      if (!target) target = runtime.getTargetById(args.NAME);
      if (!target) return;
      target.setXY(target.x + Scratch.Cast.toNumber(args.x), target.y + Scratch.Cast.toNumber(args.y));
    }

    directSprite(args) {
      let target = runtime.getSpriteTargetByName(args.NAME);
      if (!target) target = runtime.getTargetById(args.NAME);
      if (!target) return;
      target.setDirection(Scratch.Cast.toNumber(args.ANGLE));
    }

    directSprite2(args) {
      let target = runtime.getSpriteTargetByName(args.NAME);
      if (!target) target = runtime.getTargetById(args.NAME);
      if (!target) return;
      target.setDirection(target.direction + Scratch.Cast.toNumber(args.ANGLE));
    }

    sizeSprite(args) {
      let target = runtime.getSpriteTargetByName(args.NAME);
      if (!target) target = runtime.getTargetById(args.NAME);
      if (!target) return;
      target.setSize(Scratch.Cast.toNumber(args.SIZE));
    }

    sizeSprite2(args) {
      let target = runtime.getSpriteTargetByName(args.NAME);
      if (!target) target = runtime.getTargetById(args.NAME);
      if (!target) return;
      target.setSize(target.size + Scratch.Cast.toNumber(args.SIZE));
    }

    moveinangledirection(args, util) {
      const steps = -Scratch.Cast.toNumber(args.STEPS);
      const direction = Scratch.Cast.toNumber(args.DIRECTION);
      const radians = (Math.PI / 180) * ((direction + 90) * -1);
      const deltaX = steps * Math.cos(radians);
      const deltaY = steps * Math.sin(radians);
      if (args.NAME === "_myself_") util.target.setXY(util.target.x + deltaX, util.target.y + deltaY);
      else {
        let target = runtime.getSpriteTargetByName(args.NAME);
        if (!target) target = runtime.getTargetById(args.NAME);
        if (!target) return;
        target.setXY(target.x + deltaX, target.y + deltaY);
      }
    }

    randomcoordinate(args, util) {
      const maxChange = Scratch.Cast.toNumber(args.MAXCHANGE) + 1;
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

    rotateStyle(_, util) { return util.target.rotationStyle }

    betterGlide(args, util, loop) {
      let target = args.NAME === "_myself_" ? util.target : runtime.getSpriteTargetByName(args.NAME);
      if (!target) target = runtime.getTargetById(args.NAME);
      if (!target) return;
      if (!util.stackFrame.startTime) {
        util.stackFrame.startTime = new Date().getTime(); util.stackFrame.duration = Scratch.Cast.toNumber(args.SECS);
        util.stackFrame.startX = target.x; util.stackFrame.startY = target.y;
        util.stackFrame.endX = Scratch.Cast.toNumber(args.X); util.stackFrame.endY = Scratch.Cast.toNumber(args.Y);
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

    whileGlide(args, util) { this.betterGlide(args, util, "on") }

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
        const val =
            steps / Math.sqrt((x - util.target.x) ** 2 + (y - util.target.y) ** 2);
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
        // Essentially a smooth glide script.
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

        // Fix argument order if they got it backwards
        if (left > right) {
            let temp = left;
            left = right;
            right = temp;
        }
        if (bottom > top) {
            let temp = bottom;
            bottom = top;
            bottom = temp;
        }

        const drawable = this.runtime.renderer._allDrawables[util.target.drawableID];
        if (!drawable) {
            return false;
        }

        // See renderer.isTouchingDrawables

        const drawableBounds = drawable.getFastBounds();
        drawableBounds.snapToInt();

        const Rectangle = this.runtime.renderer.exports.Rectangle;
        const containsBounds = new Rectangle();
        containsBounds.initFromBounds(left, right, bottom, top);
        containsBounds.snapToInt();

        if (!containsBounds.intersects(drawableBounds)) {
            return false;
        }

        drawable.updateCPURenderAttributes();

        const intersectingBounds = Rectangle.intersect(
            drawableBounds,
            containsBounds
        );
        for (let x = intersectingBounds.left; x < intersectingBounds.right; x++) {
            for (
                let y = intersectingBounds.bottom;
                y < intersectingBounds.top;
                y++
            ) {
                // technically should be a twgl vec3, but does not actually need to be
                if (drawable.isTouching([x, y])) {
                    return true;
                }
            }
        }
        return false;
    }

    touchingxy(args, util) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const drawable = this.runtime.renderer._allDrawables[util.target.drawableID];
        if (!drawable) {
            return false;
        }
        // Position should technically be a twgl vec3, but it doesn't actually need to be
        drawable.updateCPURenderAttributes();
        return drawable.isTouching([x, y]);
    }

    setHome(_, util) {
        const target = util.target;
        if (target.isStage) return;
        // this is all of the sprite specific data we will save
        // variables are a bit too far, and most other data is stage only or shouldnt be overwritten
        const savedState = {
            x: target.x,
            y: target.y,
            size: target.size,
            stretch: Clone.simple(target.stretch), // array
            transform: Clone.simple(target.transform), // array
            direction: target.direction,
            rotationStyle: target.rotationStyle,
            visible: target.visible,
            effects: Clone.simple(target.effects), // object
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
        // dont do anything if theres no name in here
        if (!(identifier in homeTable)) {
            return;
        }
        const homeState = homeTable[identifier];
        if (!homeState) {
            return;
        }
        // set state
        target.setXY(homeState.x, homeState.y);
        target.setSize(homeState.size);
        target.setStretch(...homeState.stretch);
        target.transform[0] = homeState.transform[0];
        target.transform[1] = homeState.transform[1];
        target.setDirection(homeState.direction);
        target.setRotationStyle(homeState.rotationStyle);
        target.setVisible(homeState.visible);
        if (homeState.effects) {
            for (const effectName in homeState.effects) {
                const value = homeState.effects[effectName];
                target.setEffect(effectName, value);
            }
        }
        target.setDraggable(homeState.draggable);
        target.setCostume(homeState.currentCostume);
        target.tintColor = homeState.tintColor; // tintColor no longer exists but we'll do this anyways incase it somehow breaks things
        target.volume = homeState.volume;
        this.runtime.requestRedraw();
    }
  }

  Scratch.extensions.register(new MaxuMotion());
})(Scratch);
