window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  fruit: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33950Nt79tHgIA2DDXFgSvB", "fruit");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        fruit_type: null,
        position_x: null,
        position_y: null,
        fruit_per_roate: 0,
        fruit_all: {
          default: null,
          type: cc.Prefab
        },
        fruit_apart_1: {
          default: null,
          type: cc.Prefab
        },
        fruit_apart_2: {
          default: null,
          type: cc.Prefab
        },
        fruit_all_curent_angle: 0,
        fruit_all_per_roate_angle: 0,
        fruit_all_x_speed: 0,
        fruit_all_y_speed: 0,
        fruit_all_y_acc: .15,
        fruit_apart_x_speed: 0,
        fruit_apart_y_speed: 0,
        fruit_apart_y_acc: .17,
        fruit_apart_roate_angle: 150,
        isBroken: false,
        isActivate: true,
        isAvailable: true,
        game_manager: null
      },
      start: function start() {},
      reset_all_properties: function reset_all_properties() {
        this.fruit_type = null;
        this.position_x = null;
        this.position_y = null;
        this.fruit_per_roate = 0;
        this.fruit_all = null;
        this.fruit_apart_1 = null;
        this.fruit_apart_2 = null;
        this.fruit_all_curent_angle = 0;
        this.fruit_all_per_roate_angle = 0;
        this.fruit_all_x_speed = 0;
        this.fruit_all_y_speed = 0;
        this.fruit_all_y_acc = .15;
        this.fruit_apart_x_speed = 0;
        this.fruit_apart_y_speed = 0;
        this.fruit_apart_y_acc = .17;
        this.fruit_apart_roate_angle = 150;
        this.isBroken = false;
        this.isActivate = true;
      },
      set_properties: function set_properties(fruit_type, fruit_all, fruit_apart_1, fruit_apart_2, fruit_all_per_roate_angle, position_x, position_y, fruit_all_x_speed, fruit_all_y_speed) {
        this.fruit_type = fruit_type;
        this.fruit_all = fruit_all;
        this.fruit_apart_1 = fruit_apart_1;
        this.fruit_apart_2 = fruit_apart_2;
        this.fruit_apart_roate_angle = -150 * Math.random() - 50, this.fruit_all_per_roate_angle = fruit_all_per_roate_angle;
        this.position_x = position_x;
        this.position_y = position_y;
        this.fruit_all_x_speed = fruit_all_x_speed;
        this.fruit_all_y_speed = fruit_all_y_speed;
        if (this.position_x && this.position_y) {
          this.fruit_all.x = this.position_x;
          this.fruit_all.y = this.position_y;
        }
        if ("boom" == this.fruit_type) {
          this.game_manager.boom_flame_schedule = function() {
            if (Math.random() < .9) {
              var bf = this.game_manager.getPooledBoomFlame(this.game_manager.gid++, .2 + .5 * Math.random(), [ this.fruit_all.x + this.game_manager.node_w / 2e4 - this.game_manager.boom.width / 2 + 3, this.fruit_all.y + this.game_manager.node_h / 2e4 + this.game_manager.boom.height / 2 - 3 ], 2 * Math.PI * Math.random(), 60, this.game_manager.global_timer, cc.instantiate(this.game_manager.paint));
              this.game_manager.node.addChild(bf.paint);
            }
            for (var i in this.game_manager.pooled_boom_flame) if (false == this.game_manager.pooled_boom_flame[i].active) {
              this.game_manager.pooled_boom_flame[i].elapse = this.game_manager.global_timer - this.game_manager.pooled_boom_flame[i].create_time;
              this.game_manager.pooled_boom_flame[i].update_boom_flame(this.game_manager.drawLine.bind(this.game_manager));
            }
          };
          this.schedule(this.game_manager.boom_flame_schedule.bind(this), .04);
        }
        this.game_manager.node.addChild(this.fruit_all);
      },
      fruit_up_down: function fruit_up_down() {
        this.fruit_all.x += this.fruit_all_x_speed;
        this.fruit_all_y_speed -= this.fruit_all_y_acc;
        this.fruit_all.y += this.fruit_all_y_speed;
      },
      apart: function apart() {
        this.isBroken = true;
        if ("boom" != this.fruit_type) {
          cc.log("apart");
          this.fruit_apart_1.x = this.fruit_all.x;
          this.fruit_apart_1.y = this.fruit_all.y;
          this.fruit_apart_2.x = this.fruit_all.x;
          this.fruit_apart_2.y = this.fruit_all.y;
          this.fruit_apart_1.angle = this.fruit_all.angle;
          this.fruit_apart_2.angle = this.fruit_all.angle;
          var direction = Math.sign((this.fruit_all_curent_angle - 90) * (270 - this.fruit_all_curent_angle % 360) + 1e-10);
          this.fruit_apart_x_speed = (1.5 * Math.random() + 3.5) * direction;
          this.fruit_apart_roate_angle = (150 * Math.random() + 50) * direction;
          this.fruit_all.parent.removeChild(this.fruit_all);
          this.fruit_all = null;
          this.fruit_apart_1.runAction(cc.rotateBy(1, this.fruit_apart_roate_angle));
          this.fruit_apart_2.runAction(cc.rotateBy(1, -this.fruit_apart_roate_angle));
          this.game_manager.node.addChild(this.fruit_apart_1);
          this.game_manager.node.addChild(this.fruit_apart_2);
        }
      },
      update: function update(dt) {
        if (this.isBroken) {
          if ("boom" != this.fruit_type) {
            this.fruit_apart_1.x += this.fruit_apart_x_speed;
            this.fruit_apart_y_speed += this.fruit_apart_y_acc;
            this.fruit_apart_1.y -= this.fruit_apart_y_speed;
            this.fruit_apart_2.x -= this.fruit_apart_x_speed;
            this.fruit_apart_y_speed += this.fruit_apart_y_acc;
            this.fruit_apart_2.y -= this.fruit_apart_y_speed;
          }
        } else {
          this.fruit_up_down();
          if ("boom" != this.fruit_type) {
            this.fruit_all.angle += this.fruit_all_per_roate_angle;
            this.fruit_all_curent_angle = Math.abs(this.fruit_all.angle) % 360;
          }
        }
        this.isActivate = !this.is_out_canvas();
      },
      is_out_canvas: function is_out_canvas() {
        if (!this.isBroken) return this.fruit_all.y < this.game_manager.background.y - this.game_manager.node_h / 2;
        if ("boom" != this.fruit_type) return this.fruit_apart_1.y < this.game_manager.background.y - this.game_manager.node_h / 2 && this.fruit_apart_2.y < this.game_manager.background.y - this.game_manager.node_h / 2;
      },
      fruit_destroy: function fruit_destroy() {
        if ("boom" == this.fruit_type) {
          this.game_manager.removePooledBoomFlame();
          this.unscheduleAllCallbacks();
          this.fruit_all.parent.removeChild(this.fruit_all);
        } else if (this.isBroken) {
          this.fruit_apart_1.parent.removeChild(this.fruit_apart_1);
          this.fruit_apart_2.parent.removeChild(this.fruit_apart_2);
        } else this.fruit_all.parent.removeChild(this.fruit_all);
      }
    });
    cc._RF.pop();
  }, {} ],
  knife: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cb07KMaRBHgaFUp5Ey4gHo", "knife");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        color: "#cbd3db",
        life: .2,
        isActivate: true,
        width: 10,
        height: 10
      },
      onLoad: function onLoad() {
        this.node.color = new cc.Color().fromHEX(this.color);
      },
      start: function start() {},
      set: function set() {},
      resetProperties: function resetProperties() {
        this.color = "#cbd3db";
        this.life = .2;
        this.isActivate = true, this.width = 10;
        this.height = 10;
        this.node.width = this.width;
        this.node.height = this.height;
        this.node.angle = 0;
      },
      update: function update(dt) {
        if (!this.isActivate) {
          this.life -= dt;
          this.node.width > 0 && (this.node.width -= dt / this.life * this.width);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dee77CJ8qRNI7NspFMtBKIG", "setting");
    "use strict";
    cc.Class({
      extends: cc.Component
    });
    function show() {
      this.setting.active = true;
    }
    function hide() {
      this.setting.active = false;
    }
    cc._RF.pop();
  }, {} ],
  sound: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1924ek4hstEw47BWZiGcXJn", "sound");
    "use strict";
    var Sound = cc.Class({
      properties: {
        n: {
          default: "",
          type: cc.String
        },
        clip: {
          default: null,
          type: cc.AudioClip
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef949z6LxpCEY+chlHN+RkE", "start");
    "use strict";
    var Fruit = require("fruit"), Sound = require("sound");
    cc.Class({
      extends: cc.Component,
      properties: {
        origin_bk_w: 640,
        origin_bk_h: 480,
        home_mask: {
          default: null,
          type: cc.Node
        },
        logo: {
          default: null,
          type: cc.Node
        },
        ninja: {
          default: null,
          type: cc.Node
        },
        home_desc: {
          default: null,
          type: cc.Node
        },
        background: {
          default: null,
          type: cc.Node
        },
        dojo: {
          default: null,
          type: cc.Node
        },
        peach: {
          default: null,
          type: cc.Node
        },
        new_game: {
          default: null,
          type: cc.Node
        },
        sandia: {
          default: null,
          type: cc.Node
        },
        quit_game: {
          default: null,
          type: cc.Node
        },
        boom: {
          default: null,
          type: cc.Node
        },
        knife_part: {
          default: null,
          type: cc.Prefab
        },
        pooled_knifves: [],
        num_pooled_knifves: 10,
        knife_width: 10,
        knife_height: 10,
        _rotation: .7,
        sx: null,
        sy: null,
        ex: null,
        ey: null,
        pooled_fruits: [],
        num_pooled_fruits: 10,
        peach_prefab: {
          default: null,
          type: cc.Prefab
        },
        peach_part_1: {
          default: null,
          type: cc.Prefab
        },
        peach_part_2: {
          default: null,
          type: cc.Prefab
        },
        sandia_prefab: {
          default: null,
          type: cc.Prefab
        },
        sandia_part_1: {
          default: null,
          type: cc.Prefab
        },
        sandia_part_2: {
          default: null,
          type: cc.Prefab
        },
        banana_prefab: {
          default: null,
          type: cc.Prefab
        },
        banana_part_1: {
          default: null,
          type: cc.Prefab
        },
        banana_part_2: {
          default: null,
          type: cc.Prefab
        },
        basaha_prefab: {
          default: null,
          type: cc.Prefab
        },
        basaha_part_1: {
          default: null,
          type: cc.Prefab
        },
        basaha_part_2: {
          default: null,
          type: cc.Prefab
        },
        apple_prefab: {
          default: null,
          type: cc.Prefab
        },
        apple_part_1: {
          default: null,
          type: cc.Prefab
        },
        apple_part_2: {
          default: null,
          type: cc.Prefab
        },
        boom_prefab: {
          default: null,
          type: cc.Prefab
        },
        flash_prefab: {
          default: null,
          type: cc.Prefab
        },
        last_event_id: null,
        new_event_id: null,
        game_start_need: [ cc.Node ],
        game_score: 0,
        fruit_missed: 0,
        paint: {
          default: null,
          type: cc.Prefab
        },
        gid: 0,
        pooled_boom_flame: [],
        num_pooled_boom_flame: 20,
        global_timer: 0,
        boom_is_broken: false,
        blank_opacity: 255,
        menu_audio: {
          default: null,
          type: cc.AudioClip
        },
        musicSound: [ Sound ],
        sfxSound: [ Sound ],
        musicSource: {
          default: null,
          type: cc.AudioSource
        },
        sfxSource: {
          default: null,
          type: cc.AudioSource
        },
        musicSprite: {
          default: null,
          type: cc.Sprite
        },
        onMusicSpriteFrame: {
          default: null,
          type: cc.SpriteFrame
        },
        offMusicSpriteFrame: {
          default: null,
          type: cc.SpriteFrame
        },
        sfxSprite: {
          default: null,
          type: cc.Sprite
        },
        onSFXSpriteFrame: {
          default: null,
          type: cc.SpriteFrame
        },
        offSFXSpriteFrame: {
          default: null,
          type: cc.SpriteFrame
        },
        drop: {
          default: null,
          type: cc.Node
        }
      },
      initConfig: function initConfig() {
        this.game_start_need_name = [ "score_pic", "score_label", "x1", "x2", "x3", "xf1", "xf2", "xf3", "game_over_pic" ];
        this.fruit_type = [ "sandia", "peach", "banana", "basaha", "apple", "boom" ];
        this.config = {
          sandia: [ this.sandia_prefab, this.sandia_part_1, this.sandia_part_2 ],
          peach: [ this.peach_prefab, this.peach_part_1, this.peach_part_2 ],
          banana: [ this.banana_prefab, this.banana_part_1, this.banana_part_2 ],
          basaha: [ this.basaha_prefab, this.basaha_part_1, this.basaha_part_2 ],
          apple: [ this.apple_prefab, this.apple_part_1, this.apple_part_2 ],
          boom: [ this.boom_prefab, null, null ]
        };
      },
      drawLine: function drawLine(g, start_point, end_point, control_point_1, control_point_2) {
        g.moveTo(start_point[0], start_point[1]);
        g.quadraticCurveTo(control_point_1[0], control_point_1[1], end_point[0], end_point[1]);
        g.quadraticCurveTo(control_point_2[0], control_point_2[1], start_point[0], start_point[1]);
        g.stroke();
        g.fillColor = new cc.Color().fromHEX("f0ef9c");
        g.fill();
      },
      onLoad: function onLoad() {
        this.PlayMusic("music");
        this.initConfig();
        for (var i = 0; i < this.num_pooled_boom_flame; i++) this.pooled_boom_flame.push(new BoomFlame());
        this.boom_flame_schedule = function() {
          if (Math.random() < .9) {
            var bf = this.getPooledBoomFlame(this.gid++, .2 + .5 * Math.random(), [ this.boom.x + this.node_w / -320.182 - this.boom.width / 2 + 3, this.boom.y + this.node_h / -631.14 + this.boom.height / 2 - 3 ], 2 * Math.PI * Math.random(), 60, this.global_timer, cc.instantiate(this.paint));
            this.node.addChild(bf.paint);
          }
          for (var i in this.pooled_boom_flame) if (false == this.pooled_boom_flame[i].active) {
            this.pooled_boom_flame[i].elapse = this.global_timer - this.pooled_boom_flame[i].create_time;
            this.pooled_boom_flame[i].update_boom_flame(this.drawLine.bind(this));
          }
        };
        this.schedule(this.boom_flame_schedule, .04);
        this.game_start_need.forEach(function(e) {
          e.active = false;
        });
        this.sandia = null;
        this.peach = null;
        this.home_mask.x = -this.node.x;
        this.home_mask.y = this.node.y;
        for (var _i = 0; _i < this.num_pooled_knifves; _i++) this.pooled_knifves.push(cc.instantiate(this.knife_part));
        for (var _i2 = 0; _i2 < this.num_pooled_fruits; _i2++) this.pooled_fruits.push(this.createFruit("none"));
        cc.director.getCollisionManager().enabled = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        this.node_h = this.node.height;
        this.node_w = this.node.width;
        cc.log(this.node_h);
        cc.log(this.node_w);
        this.knife_height = this.pooled_knifves[0].getComponent("knife").height;
        this.knife_width = this.pooled_knifves[0].getComponent("knife").width;
        this.sandia = this.createFruit("sandia", 118.719, -69.386, .8, 0, 0);
        this.sandia.fruit_all_y_acc = 0;
        this.peach = this.createFruit("peach", -271.106, -238.783, -.8, 0, 0);
        this.peach.fruit_all_y_acc = 0;
      },
      start: function start() {},
      update: function update(dt) {
        var _this = this;
        this.global_timer += dt;
        this.dojo.angle = this._rotation;
        this.new_game.angle = -this._rotation;
        this.quit_game.angle = -this._rotation;
        this._rotation++;
        this.pooled_knifves.forEach(function(e) {
          if (!e.getComponent("knife").isActivate && e.getComponent("knife").life <= 0) {
            _this.node.removeChild(e);
            e.getComponent("knife").resetProperties();
          }
        });
        if (this.sandia) if (this.sandia.isActivate) this.sandia.update(dt); else {
          this.sandia.fruit_destroy();
          this.sandia = null;
        }
        if (this.peach) if (this.peach.isActivate) this.peach.update(dt); else {
          this.peach.fruit_destroy();
          this.peach = null;
        }
        this.pooled_fruits.forEach(function(e) {
          if (!e.isAvailable) if (e.isActivate) e.update(dt); else {
            if (!e.isBroken && "boom" != e.fruit_type) {
              _this.fruit_missed++;
              _this.precess_fruit_missed();
            }
            e.fruit_destroy();
            e.isAvailable = true;
          }
        });
        if (this.boom_is_broken && this.blank_paint && this.blank_opacity > 0) {
          var g = this.blank_paint.getComponent(cc.Graphics);
          g.clear();
          g.fillColor = cc.Color.WHITE.setA(this.blank_opacity -= 255 * dt);
          g.fillRect(-1e3, -1300, 2e3, 2600);
        }
      },
      getPooledKnife: function getPooledKnife() {
        for (var i = 0; i < this.num_pooled_knifves; i++) if (this.pooled_knifves[i].getComponent("knife").isActivate) {
          this.pooled_knifves[i].getComponent("knife").isActivate = false;
          return this.pooled_knifves[i];
        }
        var new_knife = cc.instantiate(this.knife_part);
        this.pooled_knifves.push(new_knife);
        new_knife.getComponent("knife").isActivate = false;
        this.num_pooled_knifves++;
        return new_knife;
      },
      onTouchStart: function onTouchStart(event) {
        this.last_event_id || (this.last_event_id = event.getID());
        this.new_event_id = event.getID();
        this.prev_pos = event.getLocation();
        this.sx = event.getLocationX();
        this.sy = event.getLocationY();
        var knife_part = this.getPooledKnife();
        this.node.addChild(knife_part);
        knife_part.setPosition(this.sx - this.node_w / 2, this.sy - this.node_h / 2);
      },
      onTouchMove: function onTouchMove(event) {
        var _this2 = this;
        this.curent_pos = event.getLocation();
        this.ex = event.getLocationX();
        this.ey = event.getLocationY();
        var lenV = this.curent_pos.sub(this.prev_pos).mag();
        var roateV = 0;
        var falsh_angle = this.curent_pos.sub(this.prev_pos).signAngle(cc.v2(1, 0)) / Math.PI * 180;
        if (lenV > this.knife_height) {
          var tempVec = cc.v2(0, 10);
          roateV = this.curent_pos.sub(this.prev_pos).signAngle(tempVec) / Math.PI * 180;
          var end_pooledKnife = this.getPooledKnife();
          if (null != end_pooledKnife) {
            this.node.addChild(end_pooledKnife);
            end_pooledKnife.height = lenV;
            end_pooledKnife.setPosition((this.sx + this.ex) / 2 - this.node_w / 2, (this.sy + this.ey) / 2 - this.node_h / 2);
            end_pooledKnife.angle = -roateV;
          }
          this.prev_pos = this.curent_pos;
          this.sx = this.ex;
          this.sy = this.ey;
          (!this.throw_audio_id || this.throw_audio_id && 1 != cc.audioEngine.getState(this.throw_audio_id)) && (this.throw_audio_id = cc.audioEngine.playEffect(this.throw_audio, false));
        }
        if (this.sandia && null != this.sandia.fruit_all && cc.Intersection.pointInPolygon(this.curent_pos, this.sandia.fruit_all.getComponent("cc.PolygonCollider").world.points)) {
          this.PlaySFX("cut");
          var flash = cc.instantiate(this.flash_prefab);
          flash.position = this.sandia.fruit_all.position;
          flash.rotation = falsh_angle;
          this.node.addChild(flash);
          setTimeout(function() {
            this.node.removeChild(flash);
          }.bind(this), 100);
          this.prepare_game_start();
          this.sandia.apart();
          this.peach.fruit_all_y_acc = .2;
          this.peach.fruit_all_x_speed = -2;
        }
        if (this.peach && null != this.peach.fruit_all && cc.Intersection.polygonCircle([ this.curent_pos ], this.peach.fruit_all.getComponent("cc.CircleCollider").world)) {
          this.PlaySFX("cut");
          var flash = cc.instantiate(this.flash_prefab);
          flash.position = this.peach.fruit_all.position;
          flash.rotation = falsh_angle;
          this.node.addChild(flash);
          setTimeout(function() {
            this.node.removeChild(flash);
          }.bind(this), 100);
          this.prepare_game_start();
          this.peach.apart();
          this.sandia.fruit_all_y_acc = .2;
          this.sandia.fruit_all_x_speed = -2;
        }
        this.boom && cc.Intersection.polygonCircle([ this.curent_pos ], this.boom.getComponent("cc.CircleCollider").world) && cc.game.end();
        this.pooled_fruits.forEach(function(e) {
          if (e && !e.isAvailable && null != e.fruit_all && (e.fruit_all.getComponent("cc.PolygonCollider") && cc.Intersection.pointInPolygon(_this2.curent_pos, e.fruit_all.getComponent("cc.PolygonCollider").world.points) || e.fruit_all.getComponent("cc.CircleCollider") && cc.Intersection.polygonCircle([ _this2.curent_pos ], e.fruit_all.getComponent("cc.CircleCollider").world))) if ("boom" != e.fruit_type) {
            _this2.PlaySFX("cut");
            _this2.game_score++;
            _this2.game_start_need[_this2.game_start_need_name.indexOf("score_label")].getComponent("cc.Label").string = _this2.game_score;
            var flash = cc.instantiate(_this2.flash_prefab);
            flash.position = e.fruit_all.position;
            flash.rotation = falsh_angle;
            _this2.node.addChild(flash);
            setTimeout(function() {
              this.node.removeChild(flash);
            }.bind(_this2), 100);
            e.apart();
          } else {
            e.apart();
            _this2.boomIsBoom(e, e.fruit_all.x + _this2.node_w / 2e3, e.fruit_all.y + _this2.node_h / 2e3);
          }
        });
      },
      prepare_game_start: function prepare_game_start() {
        cc.audioEngine.stopAll();
        this.node.removeChild(this.dojo);
        this.node.removeChild(this.new_game);
        this.node.removeChild(this.quit_game);
        this.node.removeChild(this.home_mask);
        this.node.removeChild(this.home_desc);
        this.node.removeChild(this.ninja);
        this.node.removeChild(this.logo);
        this.node.removeChild(this.boom);
        this.removePooledBoomFlame();
        this.unschedule(this.boom_flame_schedule);
        this.PlaySFX("start");
        for (var i = 0; i < 5; i++) this.game_start_need[i].active = true;
        this.schedule_func = function() {
          var num_fruits = Math.floor(3 * Math.random() + 1);
          var is_boom = true;
          while (num_fruits--) {
            var f = this.getPooledFruit(is_boom);
            "boom" == f.fruit_type && (is_boom = false);
          }
        };
        this.schedule(this.schedule_func.bind(this), 2.5);
      },
      createFruit: function createFruit(fruit_type, position_x, position_y, roate_angle, x_speed, y_speed) {
        var t = new Fruit();
        t.game_manager = this;
        if ("none" == fruit_type) return t;
        t.set_properties(fruit_type, cc.instantiate(this.config[fruit_type][0]), cc.instantiate(this.config[fruit_type][1]), cc.instantiate(this.config[fruit_type][2]), roate_angle, position_x, position_y, x_speed, y_speed);
        return t;
      },
      getPooledFruit: function getPooledFruit(is_boom) {
        for (var i = 0; i < this.num_pooled_fruits; i++) if (this.pooled_fruits[i].isAvailable) {
          var _type_index = Math.floor(5 * Math.random() + 0);
          Math.random() < .37 && is_boom && (_type_index = 5);
          this.pooled_fruits[i].reset_all_properties();
          this.pooled_fruits[i].isActivate = true;
          this.pooled_fruits[i].isAvailable = false;
          var _fruit_type = this.fruit_type[_type_index];
          var _fruit_roate_angle = Math.random() > .5 ? 1 : -1;
          var _position_x = Math.random() * (this.background.x + this.background.width / 2 - 2 - (this.background.x - this.background.width / 2 + 2) + 1) + (this.background.x - this.background.width / 2 + 2);
          var _position_y = this.background.y - this.node_h / 2 + .01;
          var _x_speed = 2.1 * Math.random() + .6;
          _x_speed = _position_x < this.background.x ? _x_speed : -_x_speed;
          var _y_speed = 16 * Math.random() + 10.7;
          "boom" != _fruit_type ? this.pooled_fruits[i].set_properties(_fruit_type, cc.instantiate(this.config[_fruit_type][0]), cc.instantiate(this.config[_fruit_type][1]), cc.instantiate(this.config[_fruit_type][2]), _fruit_roate_angle, _position_x, _position_y, _x_speed, _y_speed) : this.pooled_fruits[i].set_properties(_fruit_type, cc.instantiate(this.config[_fruit_type][0]), this.config[_fruit_type][1], this.config[_fruit_type][2], _fruit_roate_angle, _position_x, _position_y, _x_speed, _y_speed);
          this.pooled_fruits[i].game_manager = this;
          "boom" == _fruit_type;
          return this.pooled_fruits[i];
        }
        cc.log("create new fruit");
        var new_fruit = this.createFruit("none");
        this.pooled_fruits.push(new_fruit);
        new_fruit.isActivate = true;
        new_fruit.isAvailable = false;
        new_fruit.game_manager = this;
        this.num_pooled_fruits++;
        var type_index = Math.floor(2 * Math.random() + 0);
        var fruit_type = this.fruit_type[type_index];
        var fruit_roate_angle = Math.random() > .5 ? 1 : -1;
        var position_x = Math.random() * (this.background.x + this.node_w / 2 - 50 - (this.background.x - this.node_w / 2 + 50) + 1) + (this.background.x - this.node_w / 2 + 50);
        var position_y = this.background.y - this.node_h / 2;
        var x_speed = Math.random() * (23.7 - .6 + 1) + .6;
        x_speed = position_x < this.background.x ? x_speed : -x_speed;
        var y_speed = 2 * Math.random() + 10.7;
        new_fruit.set_properties(fruit_type, cc.instantiate(this.config[fruit_type][0]), cc.instantiate(this.config[fruit_type][1]), cc.instantiate(this.config[fruit_type][2]), fruit_roate_angle, position_x, position_y, x_speed, y_speed);
        return new_fruit;
      },
      precess_fruit_missed: function precess_fruit_missed() {
        if (this.fruit_missed > 0 && this.fruit_missed <= 3) {
          this.game_start_need[this.game_start_need_name.indexOf("x" + this.fruit_missed)].active = false;
          this.game_start_need[this.game_start_need_name.indexOf("xf" + this.fruit_missed)].active = true;
        }
        this.fruit_missed >= 3 && this.game_over_and_restart();
      },
      game_over_and_restart: function game_over_and_restart() {
        this.PlaySFX("gameover");
        this.game_start_need[this.game_start_need_name.indexOf("game_over_pic")].active = true;
        this.unscheduleAllCallbacks();
        this.fruit_missed = 0;
        this.boom_is_broken = false;
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        setTimeout(function() {
          this.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.director.loadScene("start");
          }, this);
        }.bind(this), 2500);
      },
      getPooledBoomFlame: function getPooledBoomFlame(id, life, center, angle, length, create_time, paint) {
        for (var i = 0; i < this.num_pooled_boom_flame; i++) if (this.pooled_boom_flame[i].active) {
          this.pooled_boom_flame[i].set_properties(id, life, center, angle, length, create_time, paint);
          this.pooled_boom_flame[i].active = false;
          return this.pooled_boom_flame[i];
        }
        var new_BF = new BoomFlame();
        this.pooled_boom_flame.push(new_BF);
        this.num_pooled_boom_flame++;
        new_BF.active = false;
        new_BF.set_properties(id, life, center, angle, length, create_time, paint);
        return new_BF;
      },
      removePooledBoomFlame: function removePooledBoomFlame() {
        for (var i = 0; i < this.num_pooled_boom_flame; i++) if (!this.pooled_boom_flame[i].active) {
          this.pooled_boom_flame[i].remove_boom_flame();
          this.pooled_boom_flame[i].active = true;
        }
      },
      createLight: function createLight(x, y, every_angle, index) {
        var light_len = 1074;
        var light_left_angle = Math.PI * (index * every_angle - 2.5) / 180;
        var light_right_angle = Math.PI * (index * every_angle + 2.5) / 180;
        var light_left_x = x + light_len * Math.cos(light_left_angle);
        var light_left_y = y + light_len * Math.sin(light_left_angle);
        var light_right_x = x + light_len * Math.cos(light_right_angle);
        var light_right_y = y + light_len * Math.sin(light_right_angle);
        var paint = cc.instantiate(this.paint);
        this.node.addChild(paint);
        var g = paint.getComponent(cc.Graphics);
        cc.log(index);
        g.moveTo(x, y);
        g.lineTo(light_left_x, light_left_y);
        g.lineTo(light_right_x, light_right_y);
        g.close();
        g.stroke();
        g.fillColor = new cc.Color().fromHEX("ffffff");
        g.fill();
      },
      boomIsBoom: function boomIsBoom(fruit, x, y) {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        this.unscheduleAllCallbacks();
        var num_light = 10;
        var light_array = [];
        for (var i = 0; i < num_light; i) light_array[i] = i++;
        light_array.sort(function() {
          return .5 - Math.random();
        });
        this.PlaySFX("boom");
        var num = num_light;
        var time = 0;
        var paint = cc.instantiate(this.paint);
        this.node.addChild(paint);
        while (num--) {
          cc.log(num);
          setTimeout(function() {
            createLight(x, y, 360 / num_light, light_array[this], paint);
          }.bind(num), time += 110);
        }
        setTimeout(function() {
          this.node.removeChild(paint);
          paint.destroy();
          fruit.fruit_destroy();
          this.blank_paint = cc.instantiate(this.paint);
          this.node.addChild(this.blank_paint);
          this.boom_is_broken = true;
        }.bind(this), time += 100);
        setTimeout(function() {
          if (this.blank_paint) {
            this.node.removeChild(this.blank_paint);
            this.blank_paint.destroy();
          }
          this.game_over_and_restart();
        }.bind(this), time += 3e3);
      },
      show: function show() {
        this.setting.active = true;
      },
      hide: function hide() {
        this.setting.active = false;
      },
      PlayMusic: function PlayMusic(name) {
        var s = this.musicSound.find(function(s) {
          return s.n === name;
        });
        if (null == s) console.log("not found"); else {
          this.musicSource.clip = s.clip;
          this.musicSource.play();
        }
      },
      PlaySFX: function PlaySFX(name) {
        var s = this.sfxSound.find(function(s) {
          return s.n === name;
        });
        if (null == s) console.log("not found"); else {
          this.sfxSource.clip = s.clip;
          this.sfxSource.play();
        }
      },
      MusicButton: function MusicButton() {
        this.state1 = !this.state1;
        if (this.state1) {
          this.musicSource.volume = 1;
          this.musicSprite.spriteFrame = this.onMusicSpriteFrame;
        } else if (!this.state1) {
          this.musicSource.volume = 0;
          this.musicSprite.spriteFrame = this.offMusicSpriteFrame;
        }
      },
      SFXButton: function SFXButton() {
        console.log("JJJJ");
        this.state2 = !this.state2;
        if (this.state2) {
          this.sfxSource.volume = 1;
          this.sfxSprite.spriteFrame = this.onSFXSpriteFrame;
        } else if (!this.state2) {
          this.sfxSource.volume = 0;
          this.sfxSprite.spriteFrame = this.offSFXSpriteFrame;
        }
      },
      dropFunc: function dropFunc() {
        this.d = !this.d;
        this.d ? this.drop.active = true : this.d || (this.drop.active = false);
      },
      Exit: function Exit() {
        cc.game.end();
      }
    });
    function BoomFlame(id, life, center, angle, length, create_time, paint) {
      this.id = id;
      this.create_time = create_time;
      this.life = life;
      this.center = center;
      this.angle = angle;
      this.length = length;
      this.radius = 15;
      this.elapse = 0;
      this.paint = paint;
      this.active = true;
      BoomFlame.prototype.set_properties = function(id, life, center, angle, length, create_time, paint) {
        this.id = id;
        this.create_time = create_time;
        this.life = life;
        this.center = center;
        this.angle = angle;
        this.length = length;
        this.radius = 15;
        this.elapse = 0;
        this.paint = paint;
        this.active = true;
      };
      BoomFlame.prototype.update_boom_flame = function(draw) {
        if (this.life - this.elapse <= 0) {
          this.remove_boom_flame();
          return;
        }
        this.paint.getComponent(cc.Graphics).clear();
        var ratio_elapse_life = this.elapse / this.life;
        var angle = this.angle;
        var center = this.center;
        var len = this.length;
        var r = this.radius;
        center = [ Math.trunc(center[0] + len * ratio_elapse_life * Math.cos(angle)), Math.trunc(center[1] + len * ratio_elapse_life * Math.sin(angle)) ];
        var start_point = [ Math.trunc(center[0] - r * (1 - ratio_elapse_life) * Math.cos(angle)), Math.trunc(center[1] - r * (1 - ratio_elapse_life) * Math.sin(angle)) ];
        var end_point = [ Math.trunc(center[0] + r * (1 - ratio_elapse_life) * Math.cos(angle)), Math.trunc(center[1] + r * (1 - ratio_elapse_life) * Math.sin(angle)) ];
        var control_point_1 = [ Math.trunc(center[0] + r * (1 - ratio_elapse_life) * Math.cos(angle + .5 * Math.PI) * .38), Math.trunc(center[1] + r * (1 - ratio_elapse_life) * Math.sin(angle + .5 * Math.PI) * .38) ];
        var control_point_2 = [ Math.trunc(center[0] + r * (1 - ratio_elapse_life) * Math.cos(angle - .5 * Math.PI) * .38), Math.trunc(center[1] + r * (1 - ratio_elapse_life) * Math.sin(angle - .5 * Math.PI) * .38) ];
        draw(this.paint.getComponent(cc.Graphics), start_point, end_point, control_point_1, control_point_2);
      };
      BoomFlame.prototype.remove_boom_flame = function() {
        this.paint.getComponent(cc.Graphics).clear();
        this.paint.destroy();
        this.active = true;
        this.id = null;
        this.create_time = null;
        this.life = null;
        this.center = null;
        this.angle = null;
        this.length = null;
        this.radius = null;
        this.elapse = null;
        this.paint = null;
      };
    }
    function createLight(x, y, every_angle, index, paint) {
      var light_len = 1074;
      var light_left_angle = Math.PI * (index * every_angle - 2.5) / 180;
      var light_right_angle = Math.PI * (index * every_angle + 2.5) / 180;
      var light_left_x = x + light_len * Math.cos(light_left_angle);
      var light_left_y = y + light_len * Math.sin(light_left_angle);
      var light_right_x = x + light_len * Math.cos(light_right_angle);
      var light_right_y = y + light_len * Math.sin(light_right_angle);
      var g = paint.getComponent(cc.Graphics);
      g.moveTo(x, y);
      g.lineTo(light_left_x, light_left_y);
      g.lineTo(light_right_x, light_right_y);
      g.close();
      g.stroke();
      g.fillColor = cc.Color.WHITE;
      g.fill();
    }
    cc._RF.pop();
  }, {
    fruit: "fruit",
    sound: "sound"
  } ],
  "use_v2.1-2.2.1_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4ee1owy/9McJMfIl6DKmkb", "use_v2.1-2.2.1_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = true);
    cc._RF.pop();
  }, {} ]
}, {}, [ "use_v2.1-2.2.1_cc.Toggle_event", "fruit", "knife", "setting", "sound", "start" ]);