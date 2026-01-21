//=============================================================================
// RPG Maker MZ - MYTH_VisuMZ_CompatPatch
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Compatability patch between MYTH_CGC_CoreEngine(Version 1.6.4) and VisuMZ_1_BattleCore(Version 1.87)
 * @author Jimmy
 * 
 * 
 * @help
 * 
 * //=============================================================================
 * // RPG Maker MZ - MYTH_VisuMZ_CompatPatch
 * //=============================================================================
 * 
 * MYTH_CGC_* plugins must go below VisuMZ* plugins. 
 * This plugin must be placed below all MYTH_CGC plugins.
 * 
 * Good luck!
*/


var Compat_Myth_VisuMZ = Compat_Myth_VisuMZ || {};
Compat_Myth_VisuMZ.prototypes = Compat_Myth_VisuMZ.prototypes || {};
Compat_Myth_VisuMZ.version = 1.0;
Compat_Myth_VisuMZ.minorVersion = 2;

(() => {
    const pluginName = "MYTH_VisuMZ_CompatPatch";
///////////////////////////////////////
// REGION Compat_Window_Base
//////////////////////////////////////



function Compat_Window_Base() {
    this.initialize(...arguments);
}

Compat_Window_Base.prototype = Object.create(Window.prototype);
Compat_Window_Base.prototype.constructor = Compat_Window_Base;

Compat_Window_Base.prototype.initialize = function(rect) {
    Window.prototype.initialize.call(this);
    this.loadWindowskin();
    this.checkRectObject(rect);
    this.move(rect.x, rect.y, rect.width, rect.height);
    this.updatePadding();
    this.updateBackOpacity();
    this.updateTone();
    this.createContents();
    this._opening = false;
    this._closing = false;
    this._dimmerSprite = null;
};

Compat_Window_Base.prototype.destroy = function(options) {
    this.destroyContents();
    if(this._dimmerSprite) {
        this._dimmerSprite.bitmap.destroy();
    }
    Window.prototype.destroy.call(this, options);
};

Compat_Window_Base.prototype.checkRectObject = function(rect) {
    if(typeof rect !== "object" || !("x" in rect)) {
        // Probably MV plugin is used
        throw new Error("Argument must be a Rectangle");
    }
};

Compat_Window_Base.prototype.lineHeight = function() {
    return 36;
};

Compat_Window_Base.prototype.itemWidth = function() {
    return this.innerWidth;
};

Compat_Window_Base.prototype.itemHeight = function() {
    return this.lineHeight();
};

Compat_Window_Base.prototype.itemPadding = function() {
    return 8;
};

Compat_Window_Base.prototype.baseTextRect = function() {
    const rect = new Rectangle(0, 0, this.innerWidth, this.innerHeight);
    rect.pad(-this.itemPadding(), 0);
    return rect;
};

Compat_Window_Base.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem("Window");
};

Compat_Window_Base.prototype.updatePadding = function() {
    this.padding = $gameSystem.windowPadding();
};

Compat_Window_Base.prototype.updateBackOpacity = function() {
    this.backOpacity = $gameSystem.windowOpacity();
};

Compat_Window_Base.prototype.fittingHeight = function(numLines) {
    return numLines * this.itemHeight() + $gameSystem.windowPadding() * 2;
};

Compat_Window_Base.prototype.updateTone = function() {
    const tone = $gameSystem.windowTone();
    this.setTone(tone[0], tone[1], tone[2]);
};

Compat_Window_Base.prototype.createContents = function() {
    const width = this.contentsWidth();
    const height = this.contentsHeight();
    this.destroyContents();
    this.contents = new Bitmap(width, height);
    this.contentsBack = new Bitmap(width, height);
    this.resetFontSettings();
};

Compat_Window_Base.prototype.destroyContents = function() {
    if(this.contents) {
        this.contents.destroy();
    }
    if(this.contentsBack) {
        this.contentsBack.destroy();
    }
};

Compat_Window_Base.prototype.contentsWidth = function() {
    return this.innerWidth;
};

Compat_Window_Base.prototype.contentsHeight = function() {
    return this.innerHeight;
};

Compat_Window_Base.prototype.resetFontSettings = function() {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = $gameSystem.mainFontSize();
    this.resetTextColor();
};

Compat_Window_Base.prototype.resetTextColor = function() {
    this.changeTextColor(ColorManager.normalColor());
    this.changeOutlineColor(ColorManager.outlineColor());
};

Compat_Window_Base.prototype.update = function() {
    Window.prototype.update.call(this);
    this.updateTone();
    this.updateOpen();
    this.updateClose();
    this.updateBackgroundDimmer();
};

Compat_Window_Base.prototype.updateOpen = function() {
    if(this._opening) {
        this.openness += 32;
        if(this.isOpen()) {
            this._opening = false;
        }
    }
};

Compat_Window_Base.prototype.updateClose = function() {
    if(this._closing) {
        this.openness -= 32;
        if(this.isClosed()) {
            this._closing = false;
        }
    }
};

Compat_Window_Base.prototype.open = function() {
    if(!this.isOpen()) {
        this._opening = true;
    }
    this._closing = false;
};

Compat_Window_Base.prototype.close = function() {
    if(!this.isClosed()) {
        this._closing = true;
    }
    this._opening = false;
};

Compat_Window_Base.prototype.isOpening = function() {
    return this._opening;
};

Compat_Window_Base.prototype.isClosing = function() {
    return this._closing;
};

Compat_Window_Base.prototype.show = function() {
    this.visible = true;
};

Compat_Window_Base.prototype.hide = function() {
    this.visible = false;
};

Compat_Window_Base.prototype.activate = function() {
    this.active = true;
};

Compat_Window_Base.prototype.deactivate = function() {
    this.active = false;
};

Compat_Window_Base.prototype.systemColor = function() {
    return ColorManager.systemColor();
};

Compat_Window_Base.prototype.translucentOpacity = function() {
    return 160;
};

Compat_Window_Base.prototype.changeTextColor = function(color) {
    this.contents.textColor = color;
};

Compat_Window_Base.prototype.changeOutlineColor = function(color) {
    this.contents.outlineColor = color;
};

Compat_Window_Base.prototype.changePaintOpacity = function(enabled) {
    this.contents.paintOpacity = enabled ? 255 : this.translucentOpacity();
};

Compat_Window_Base.prototype.drawRect = function(x, y, width, height) {
    const outlineColor = this.contents.outlineColor;
    const mainColor = this.contents.textColor;
    this.contents.fillRect(x, y, width, height, outlineColor);
    this.contents.fillRect(x + 1, y + 1, width - 2, height - 2, mainColor);
};

Compat_Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};

Compat_Window_Base.prototype.textWidth = function(text) {
    return this.contents.measureTextWidth(text);
};

Compat_Window_Base.prototype.drawTextEx = function(text, x, y, width) {
    this.resetFontSettings();
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

Compat_Window_Base.prototype.textSizeEx = function(text) {
    this.resetFontSettings();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return { width: textState.outputWidth, height: textState.outputHeight };
};

Compat_Window_Base.prototype.createTextState = function(text, x, y, width) {
    const rtl = Utils.containsArabic(text);
    const textState = {};
    textState.text = this.convertEscapeCharacters(text);
    textState.index = 0;
    textState.x = rtl ? x + width : x;
    textState.y = y;
    textState.width = width;
    textState.height = this.calcTextHeight(textState);
    textState.startX = textState.x;
    textState.startY = textState.y;
    textState.rtl = rtl;
    textState.buffer = this.createTextBuffer(rtl);
    textState.drawing = true;
    textState.outputWidth = 0;
    textState.outputHeight = 0;
    return textState;
};

Compat_Window_Base.prototype.processAllText = function(textState) {
    while(textState.index < textState.text.length) {
        this.processCharacter(textState);
    }
    this.flushTextState(textState);
};

Compat_Window_Base.prototype.flushTextState = function(textState) {
    const text = textState.buffer;
    const rtl = textState.rtl;
    const width = this.textWidth(text);
    const height = textState.height;
    const x = rtl ? textState.x - width : textState.x;
    const y = textState.y;
    if(textState.drawing) {
        this.contents.drawText(text, x, y, width, height);
    }
    textState.x += rtl ? -width : width;
    textState.buffer = this.createTextBuffer(rtl);
    const outputWidth = Math.abs(textState.x - textState.startX);
    if(textState.outputWidth < outputWidth) {
        textState.outputWidth = outputWidth;
    }
    textState.outputHeight = y - textState.startY + height;
};

Compat_Window_Base.prototype.createTextBuffer = function(rtl) {
    // U+202B: RIGHT-TO-LEFT EMBEDDING
    return rtl ? "\u202B" : "";
};

Compat_Window_Base.prototype.convertEscapeCharacters = function(text) {
    /* eslint no-control-regex: 0 */
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    text = text.replace(/\x1bV\[(\d+)\]/gi,(_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bV\[(\d+)\]/gi,(_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bN\[(\d+)\]/gi,(_, p1) =>
        this.actorName(parseInt(p1))
    );
    text = text.replace(/\x1bP\[(\d+)\]/gi,(_, p1) =>
        this.partyMemberName(parseInt(p1))
    );
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

Compat_Window_Base.prototype.actorName = function(n) {
    const actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : "";
};

Compat_Window_Base.prototype.partyMemberName = function(n) {
    const actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : "";
};

Compat_Window_Base.prototype.processCharacter = function(textState) {
    const c = textState.text[textState.index++];
    if(c.charCodeAt(0) < 0x20) {
        this.flushTextState(textState);
        this.processControlCharacter(textState, c);
    } else {
        textState.buffer += c;
    }
};

Compat_Window_Base.prototype.processControlCharacter = function(textState, c) {
    if(c === "\n") {
        this.processNewLine(textState);
    }
    if(c === "\x1b") {
        const code = this.obtainEscapeCode(textState);
        this.processEscapeCharacter(code, textState);
    }
};

Compat_Window_Base.prototype.processNewLine = function(textState) {
    textState.x = textState.startX;
    textState.y += textState.height;
    textState.height = this.calcTextHeight(textState);
};

Compat_Window_Base.prototype.obtainEscapeCode = function(textState) {
    const regExp = /^[$.|^!><{}\\]|^[A-Z]+/i;
    const arr = regExp.exec(textState.text.slice(textState.index));
    if(arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return "";
    }
};

Compat_Window_Base.prototype.obtainEscapeParam = function(textState) {
    const regExp = /^\[\d+\]/;
    const arr = regExp.exec(textState.text.slice(textState.index));
    if(arr) {
        textState.index += arr[0].length;
        return parseInt(arr[0].slice(1));
    } else {
        return "";
    }
};

Compat_Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch(code) {
        case "C":
            this.processColorChange(this.obtainEscapeParam(textState));
            break;
        case "I":
            this.processDrawIcon(this.obtainEscapeParam(textState), textState);
            break;
        case "PX":
            textState.x = this.obtainEscapeParam(textState);
            break;
        case "PY":
            textState.y = this.obtainEscapeParam(textState);
            break;
        case "FS":
            this.contents.fontSize = this.obtainEscapeParam(textState);
            break;
        case "{":
            this.makeFontBigger();
            break;
        case "}":
            this.makeFontSmaller();
            break;
    }
};

Compat_Window_Base.prototype.processColorChange = function(colorIndex) {
    this.changeTextColor(ColorManager.textColor(colorIndex));
};

Compat_Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
    if(textState.drawing) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    }
    textState.x += ImageManager.iconWidth + 4;
};

Compat_Window_Base.prototype.makeFontBigger = function() {
    if(this.contents.fontSize <= 96) {
        this.contents.fontSize += 12;
    }
};

Compat_Window_Base.prototype.makeFontSmaller = function() {
    if(this.contents.fontSize >= 24) {
        this.contents.fontSize -= 12;
    }
};

Compat_Window_Base.prototype.calcTextHeight = function(textState) {
    const lineSpacing = this.lineHeight() - $gameSystem.mainFontSize();
    const lastFontSize = this.contents.fontSize;
    const lines = textState.text.slice(textState.index).split("\n");
    const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
    this.contents.fontSize = lastFontSize;
    return textHeight;
};

Compat_Window_Base.prototype.maxFontSizeInLine = function(line) {
    let maxFontSize = this.contents.fontSize;
    const regExp = /\x1b({|}|FS)(\[(\d+)])?/gi;
    for(;;) {
        const array = regExp.exec(line);
        if(!array) {
            break;
        }
        const code = String(array[1]).toUpperCase();
        if(code === "{") {
            this.makeFontBigger();
        } else if(code === "}") {
            this.makeFontSmaller();
        } else if(code === "FS") {
            this.contents.fontSize = parseInt(array[3]);
        }
        if(this.contents.fontSize > maxFontSize) {
            maxFontSize = this.contents.fontSize;
        }
    }
    return maxFontSize;
};

Compat_Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx =(iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

// prettier-ignore
Compat_Window_Base.prototype.drawFace = function(
    faceName, faceIndex, x, y, width, height
) {
    width = width || ImageManager.faceWidth;
    height = height || ImageManager.faceHeight;
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = Math.floor((faceIndex % 4) * pw +(pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph +(ph - sh) / 2);
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

// prettier-ignore
Compat_Window_Base.prototype.drawCharacter = function(
    characterName, characterIndex, x, y
) {
    const bitmap = ImageManager.loadCharacter(characterName);
    const big = ImageManager.isBigCharacter(characterName);
    const pw = bitmap.width /(big ? 3 : 12);
    const ph = bitmap.height /(big ? 4 : 8);
    const n = big ? 0: characterIndex;
    const sx =((n % 4) * 3 + 1) * pw;
    const sy = Math.floor(n / 4) * 4 * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

Compat_Window_Base.prototype.drawItemName = function(item, x, y, width) {
    if(item) {
        const iconY = y +(this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, width - textMargin);
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x, iconY);
        this.drawText(item.name, x + textMargin, y, itemWidth);
    }
};

Compat_Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    const unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, "right");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
};

Compat_Window_Base.prototype.setBackgroundType = function(type) {
    if(type === 0) {
        this.opacity = 255;
    } else {
        this.opacity = 0;
    }
    if(type === 1) {
        this.showBackgroundDimmer();
    } else {
        this.hideBackgroundDimmer();
    }
};

Compat_Window_Base.prototype.showBackgroundDimmer = function() {
    if(!this._dimmerSprite) {
        this.createDimmerSprite();
    }
    const bitmap = this._dimmerSprite.bitmap;
    if(bitmap.width !== this.width || bitmap.height !== this.height) {
        this.refreshDimmerBitmap();
    }
    this._dimmerSprite.visible = true;
    this.updateBackgroundDimmer();
};

Compat_Window_Base.prototype.createDimmerSprite = function() {
    this._dimmerSprite = new Sprite();
    this._dimmerSprite.bitmap = new Bitmap(0, 0);
    this._dimmerSprite.x = -4;
    this.addChildToBack(this._dimmerSprite);
};

Compat_Window_Base.prototype.hideBackgroundDimmer = function() {
    if(this._dimmerSprite) {
        this._dimmerSprite.visible = false;
    }
};

Compat_Window_Base.prototype.updateBackgroundDimmer = function() {
    if(this._dimmerSprite) {
        this._dimmerSprite.opacity = this.openness;
    }
};

Compat_Window_Base.prototype.refreshDimmerBitmap = function() {
    if(this._dimmerSprite) {
        const bitmap = this._dimmerSprite.bitmap;
        const w = this.width > 0 ? this.width + 8 : 0;
        const h = this.height;
        const m = this.padding;
        const c1 = ColorManager.dimColor1();
        const c2 = ColorManager.dimColor2();
        bitmap.resize(w, h);
        bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
        bitmap.fillRect(0, m, w, h - m * 2, c1);
        bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
        this._dimmerSprite.setFrame(0, 0, w, h);
    }
};

Compat_Window_Base.prototype.playCursorSound = function() {
    SoundManager.playCursor();
};

Compat_Window_Base.prototype.playOkSound = function() {
    SoundManager.playOk();
};

Compat_Window_Base.prototype.playBuzzerSound = function() {
    SoundManager.playBuzzer();
};



///////////////////////////////////////
// REGION Sprite_SkillCard
//////////////////////////////////////

        Sprite_SkillCard.prototype.initDigitGrouping = function()
        {
                return Compat_Window_Base.prototype.initDigitGrouping.call(this);
        };

        Sprite_SkillCard.prototype.lineHeight = function()
        {
                return Compat_Window_Base.prototype.lineHeight.call(this);
        };

        Sprite_SkillCard.prototype.itemPadding = function()
        {
                return Compat_Window_Base.prototype.itemPadding.call(this);
        };

        Sprite_SkillCard.prototype.updateBackOpacity = function()
        {
                return Compat_Window_Base.prototype.updateBackOpacity.call(this);
        };

        Sprite_SkillCard.prototype.translucentOpacity = function()
        {
                return Compat_Window_Base.prototype.translucentOpacity.call(this);
        };

        Sprite_SkillCard.prototype.openingSpeed = function()
        {
                return Compat_Window_Base.prototype.openingSpeed.call(this);
        };


        Sprite_SkillCard.prototype.useDigitGrouping = function()
        {
                return Compat_Window_Base.prototype.useDigitGrouping.call(this);
        };

        Sprite_SkillCard.prototype.createTextState = function(_0x1824e2, _0x49e87b, _0x1181b1, _0x355711)
        {
                return Compat_Window_Base.prototype.createTextState.call(this, _0x1824e2, _0x49e87b, _0x1181b1, _0x355711);
        };

        Sprite_SkillCard.prototype.useDigitGroupingEx = function()
        {
                return Compat_Window_Base.prototype.useDigitGroupingEx.call(this);
        };

        Sprite_SkillCard.prototype.enableDigitGrouping = function(_0x38304b)
        {
                return Compat_Window_Base.prototype.enableDigitGrouping.call(this,_0x38304b);
        };

        Sprite_SkillCard.prototype.enableDigitGroupingEx = function(_0x45bd98)
        {
                return Compat_Window_Base.prototype.enableDigitGroupingEx.call(this,_0x45bd98);
        };

        Sprite_SkillCard.prototype.drawIcon = function(_0x42a305, _0x5c684a, _0x1d872c)
        {
                return Compat_Window_Base.prototype.drawIcon.call(this,_0x42a305, _0x5c684a, _0x1d872c);
        };

        Sprite_SkillCard.prototype.drawFace = function(_0x14aa4e, _0x11130c, _0x2b3974, _0xd0e37f, _0x2689eb, _0x54dbb7)
        {
                return Compat_Window_Base.prototype.drawFace.call(this,_0x14aa4e, _0x11130c, _0x2b3974, _0xd0e37f, _0x2689eb, _0x54dbb7);
        };

        Sprite_SkillCard.prototype.drawCharacter = function(_0x414541, _0x29a7bf, _0x2fe065, _0x2391ae)
        {
                return Compat_Window_Base.prototype.drawCharacter.call(this,_0x414541, _0x29a7bf, _0x2fe065, _0x2391ae);
        };

        Sprite_SkillCard.prototype.initCoreEasing = function()
        {
                return Compat_Window_Base.prototype.initCoreEasing.call(this);
        };

        Sprite_SkillCard.prototype.updateCoreEasing = function()
        {
                return Compat_Window_Base.prototype.updateCoreEasing.call(this);
        };

        Sprite_SkillCard.prototype.applyCoreEasing = function(_0x580acb, _0x5f4750)
        {
                return Compat_Window_Base.prototype.applyCoreEasing.call(this,_0x580acb, _0x5f4750);
        };

        Sprite_SkillCard.prototype.calcCoreEasing = function(_0x59e8f0)
        {
                return Compat_Window_Base.prototype.calcCoreEasing.call(this,_0x59e8f0);
        };

        Sprite_SkillCard.prototype.anchorCoreEasing = function(_0xbeb209, _0x24dc70)
        {
                return Compat_Window_Base.prototype.anchorCoreEasing.call(this,_0xbeb209, _0x24dc70);
        };

        Sprite_SkillCard.prototype.setupCoreEasing = function(_0x190cdb, _0x2ae548, _0x3bf4ff, _0x52c563, _0x5b630f, _0x229d78, _0x5b8ce3, _0x20e5be, _0x48b52d)
        {
                return Compat_Window_Base.prototype.setupCoreEasing.call(this,_0x190cdb, _0x2ae548, _0x3bf4ff, _0x52c563, _0x5b630f, _0x229d78, _0x5b8ce3, _0x20e5be, _0x48b52d);
        };

        Sprite_SkillCard.prototype.drawCurrencyValue = function(_0xa5f926, _0x3042d3, _0x436e74, _0x2417f2, _0x4b6392)
        {
                return Compat_Window_Base.prototype.drawCurrencyValue.call(this,_0xa5f926, _0x3042d3, _0x436e74, _0x2417f2, _0x4b6392);
        };

        Sprite_SkillCard.prototype.drawIconBySize = function(_0x280867, _0x549aef, _0xf69b4c, _0x456c2a, _0x28ac47)
        {
                return Compat_Window_Base.prototype.drawIconBySize.call(this,_0x280867, _0x549aef, _0xf69b4c, _0x456c2a, _0x28ac47);
        };

        Sprite_SkillCard.prototype.drawGauge = function(_0xdd76f7, _0x3cfe4a, _0x23a555, _0x1987c2, _0x587ad0, _0xb6709a)
        {
                return Compat_Window_Base.prototype.drawGauge.call(this,_0xdd76f7, _0x3cfe4a, _0x23a555, _0x1987c2, _0x587ad0, _0xb6709a);
        };

        Sprite_SkillCard.prototype.isScrollBarVisible = function()
        {
                return Compat_Window_Base.prototype.isScrollBarVisible.call(this);
        };

        Sprite_SkillCard.prototype.createScrollBarSprites = function()
        {
                return Compat_Window_Base.prototype.createScrollBarSprites.call(this);
        };

        Sprite_SkillCard.prototype.setupScrollBarBitmap = function(_0x217aaf)
        {
                return Compat_Window_Base.prototype.setupScrollBarBitmap.call(this,_0x217aaf);
        };

        Sprite_SkillCard.prototype.destroyScrollBarBitmaps = function()
        {
                return Compat_Window_Base.prototype.destroyScrollBarBitmaps.call(this);
        };

        Sprite_SkillCard.prototype.updateScrollBarPosition = function(_0x431c2c)
        {
                return Compat_Window_Base.prototype.updateScrollBarPosition.call(this,_0x431c2c);
        };

        Sprite_SkillCard.prototype.processDrawIcon = function(_0x52962c, _0x421c97)
        {
                return Compat_Window_Base.prototype.processDrawIcon.call(this,_0x52962c, _0x421c97);
        };

        Sprite_SkillCard.prototype.createDimmerSprite = function()
        {
                return Compat_Window_Base.prototype.createDimmerSprite.call(this);
        };

        Sprite_SkillCard.prototype.refreshDimmerBitmap = function()
        {
                return Compat_Window_Base.prototype.refreshDimmerBitmap.call(this);
        };

        Sprite_SkillCard.prototype.initMessageCore = function(_0xf217c3)
        {
                return Compat_Window_Base.prototype.initMessageCore.call(this,_0xf217c3);
        };

        Sprite_SkillCard.prototype.initTextAlignement = function()
        {
                return Compat_Window_Base.prototype.initTextAlignement.call(this);
        };

        Sprite_SkillCard.prototype.setTextAlignment = function(_0x41aa11)
        {
                return Compat_Window_Base.prototype.setTextAlignment.call(this,_0x41aa11);
        };

        Sprite_SkillCard.prototype.getTextAlignment = function()
        {
                return Compat_Window_Base.prototype.getTextAlignment.call(this);
        };

        Sprite_SkillCard.prototype.textSizeEx = function(_0x9e4181)
        {
                return Compat_Window_Base.prototype.textSizeEx.call(this,_0x9e4181);
        };

        Sprite_SkillCard.prototype.textSizeExRaw = function(_0x2f7502)
        {
                return Compat_Window_Base.prototype.textSizeExRaw.call(this,_0x2f7502);
        };

        Sprite_SkillCard.prototype.processAllText = function(_0x52fc0d)
        {
                return Compat_Window_Base.prototype.processAllText.call(this,_0x52fc0d);
        };

        Sprite_SkillCard.prototype.resetWordWrap = function()
        {
                return Compat_Window_Base.prototype.resetWordWrap.call(this);
        };

        Sprite_SkillCard.prototype.isWordWrapEnabled = function()
        {
                return Compat_Window_Base.prototype.isWordWrapEnabled.call(this);
        };

        Sprite_SkillCard.prototype.setWordWrap = function(_0x34a23e)
        {
                return Compat_Window_Base.prototype.setWordWrap.call(this,_0x34a23e);
        };

        Sprite_SkillCard.prototype.registerResetRect = function(_0x1a068f)
        {
                return Compat_Window_Base.prototype.registerResetRect.call(this,_0x1a068f);
        };

        Sprite_SkillCard.prototype.resetTextColor = function()
        {
                return Compat_Window_Base.prototype.resetTextColor.call(this);
        };

        Sprite_SkillCard.prototype.setColorLock = function(_0x354725)
        {
                return Compat_Window_Base.prototype.setColorLock.call(this,_0x354725);
        };

        Sprite_SkillCard.prototype.isColorLocked = function()
        {
                return Compat_Window_Base.prototype.isColorLocked.call(this);
        };

        Sprite_SkillCard.prototype.isAutoColorAffected = function()
        {
                return Compat_Window_Base.prototype.isAutoColorAffected.call(this);
        };

        Sprite_SkillCard.prototype.getPreservedFontSettings = function()
        {
                return Compat_Window_Base.prototype.getPreservedFontSettings.call(this);
        };

        Sprite_SkillCard.prototype.returnPreservedFontSettings = function(_0x407b22)
        {
                return Compat_Window_Base.prototype.returnPreservedFontSettings.call(this,_0x407b22);
        };

        Sprite_SkillCard.prototype.canMove = function()
        {
                return Compat_Window_Base.prototype.canMove.call(this);
        };

        Sprite_SkillCard.prototype.updateMove = function()
        {
                return Compat_Window_Base.prototype.updateMove.call(this);
        };

        Sprite_SkillCard.prototype.clampPlacementPosition = function(_0x20311d, _0x743a7f)
        {
                return Compat_Window_Base.prototype.clampPlacementPosition.call(this,_0x20311d, _0x743a7f);
        };

        Sprite_SkillCard.prototype.applyMoveEasing = function(_0xd726f6, _0x3e0d6e)
        {
                return Compat_Window_Base.prototype.applyMoveEasing.call(this,_0xd726f6, _0x3e0d6e);
        };

        Sprite_SkillCard.prototype.calcMoveEasing = function(_0x3da18f)
        {
                return Compat_Window_Base.prototype.calcMoveEasing.call(this,_0x3da18f);
        };

        Sprite_SkillCard.prototype.moveTo = function(_0x471789, _0x7be898, _0x5c17bc, _0x15eb4a, _0x3cdd2c, _0x51f8e9)
        {
                return Compat_Window_Base.prototype.moveTo.call(this,_0x471789, _0x7be898, _0x5c17bc, _0x15eb4a, _0x3cdd2c, _0x51f8e9);
        };

        Sprite_SkillCard.prototype.moveBy = function(_0x5211dd, _0x7b127, _0x2a1764, _0x429b1d, _0x35ade4, _0x3bf7d2)
        {
                return Compat_Window_Base.prototype.moveBy.call(this,_0x5211dd, _0x7b127, _0x2a1764, _0x429b1d, _0x35ade4, _0x3bf7d2);
        };

        Sprite_SkillCard.prototype.resetRect = function(_0x4c5f60, _0x3a91b7)
        {
                return Compat_Window_Base.prototype.resetRect.call(this,_0x4c5f60, _0x3a91b7);
        };

        Sprite_SkillCard.prototype.changeTextColor = function(_0x3bf0cb)
        {
                return Compat_Window_Base.prototype.changeTextColor.call(this,_0x3bf0cb);
        };

        Sprite_SkillCard.prototype.processPreviousColor = function(_0x3cd6d9)
        {
                return Compat_Window_Base.prototype.processPreviousColor.call(this,_0x3cd6d9);
        };

        Sprite_SkillCard.prototype.convertEscapeCharacters = function(text)
        {
                var text = Compat_Window_Base.prototype.convertEscapeCharacters.call(this, text);
                text = text.replace(/\x1bBR/gi, '\n');
                text = text.replace(/<br>/gi, '\n');
                return text;
        }

        Sprite_SkillCard.prototype.calcTextHeight = function(textState, all)
        {
                console.log("AVCL");
                if(Myth.Util.usingMZ)
                {
                        const lineSpacing = this.lineHeight() / 2;
                        const lastFontSize = this.contents.fontSize;
                        const lines = textState.text.slice(textState.index).split("\n");
                        const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
                        this.contents.fontSize = lastFontSize;
                        return textHeight;
                }
                else
                        return Compat_Window_Base.prototype.calcTextHeight.call(this, textState, all);
        };


        Sprite_SkillCard.prototype.convertTextMacros = function(_0x51003e)
        {
                return Compat_Window_Base.prototype.convertTextMacros.call(this,_0x51003e);
        };

        Sprite_SkillCard.prototype.convertBackslashCharacters = function(_0x3419e8)
        {
                return Compat_Window_Base.prototype.convertBackslashCharacters.call(this,_0x3419e8);
        };

        Sprite_SkillCard.prototype.convertVariableEscapeCharacters = function(_0x45b632)
        {
                return Compat_Window_Base.prototype.convertVariableEscapeCharacters.call(this,_0x45b632);
        };

        Sprite_SkillCard.prototype.convertButtonAssistEscapeCharacters = function(_0x2be29)
        {
                return Compat_Window_Base.prototype.convertButtonAssistEscapeCharacters.call(this,_0x2be29);
        };

        Sprite_SkillCard.prototype.convertButtonAssistText = function(_0x15cb8e)
        {
                return Compat_Window_Base.prototype.convertButtonAssistText.call(this,_0x15cb8e);
        };

        Sprite_SkillCard.prototype.preConvertEscapeCharacters = function(_0x5a4d67)
        {
                return Compat_Window_Base.prototype.preConvertEscapeCharacters.call(this,_0x5a4d67);
        };

        Sprite_SkillCard.prototype.switchOutTextForLocalization = function(_0x393333)
        {
                return Compat_Window_Base.prototype.switchOutTextForLocalization.call(this,_0x393333);
        };

        Sprite_SkillCard.prototype.postConvertEscapeCharacters = function(_0x38c692)
        {
                return Compat_Window_Base.prototype.postConvertEscapeCharacters.call(this,_0x38c692);
        };

        Sprite_SkillCard.prototype.convertShowChoiceEscapeCodes = function(_0x2a0cbc)
        {
                return Compat_Window_Base.prototype.convertShowChoiceEscapeCodes.call(this,_0x2a0cbc);
        };

        Sprite_SkillCard.prototype.isChoiceWindow = function()
        {
                return Compat_Window_Base.prototype.isChoiceWindow.call(this);
        };

        Sprite_SkillCard.prototype.convertFontSettingsEscapeCharacters = function(_0x2cd842)
        {
                return Compat_Window_Base.prototype.convertFontSettingsEscapeCharacters.call(this,_0x2cd842);
        };

        Sprite_SkillCard.prototype.convertTextAlignmentEscapeCharacters = function(_0x2f1aa3)
        {
                return Compat_Window_Base.prototype.convertTextAlignmentEscapeCharacters.call(this,_0x2f1aa3);
        };

        Sprite_SkillCard.prototype.convertLockColorsEscapeCharacters = function(_0x4c0c34)
        {
                return Compat_Window_Base.prototype.convertLockColorsEscapeCharacters.call(this,_0x4c0c34);
        };

        Sprite_SkillCard.prototype.convertCasingEscapeCharacters = function(_0x5aa68e)
        {
                return Compat_Window_Base.prototype.convertCasingEscapeCharacters.call(this,_0x5aa68e);
        };

        Sprite_SkillCard.prototype.convertBaseEscapeCharacters = function(_0x5c04aa)
        {
                return Compat_Window_Base.prototype.convertBaseEscapeCharacters.call(this,_0x5c04aa);
        };

        Sprite_SkillCard.prototype.convertHardcodedEscapeReplacements = function(_0x48af2c)
        {
                return Compat_Window_Base.prototype.convertHardcodedEscapeReplacements.call(this,_0x48af2c);
        };

        Sprite_SkillCard.prototype.battleTargetName = function()
        {
                return Compat_Window_Base.prototype.battleTargetName.call(this);
        };

        Sprite_SkillCard.prototype.battleUserName = function()
        {
                return Compat_Window_Base.prototype.battleUserName.call(this);
        };

        Sprite_SkillCard.prototype.battleActionName = function(_0x59d4dd)
        {
                return Compat_Window_Base.prototype.battleActionName.call(this,_0x59d4dd);
        };

        Sprite_SkillCard.prototype.convertMessageCoreEscapeActions = function(_0x2a433a)
        {
                return Compat_Window_Base.prototype.convertMessageCoreEscapeActions.call(this,_0x2a433a);
        };

        Sprite_SkillCard.prototype.convertMessageCoreEscapeReplacements = function(_0x252b4e)
        {
                return Compat_Window_Base.prototype.convertMessageCoreEscapeReplacements.call(this,_0x252b4e);
        };

        Sprite_SkillCard.prototype.actorName = function(_0xaf42a7)
        {
                return Compat_Window_Base.prototype.actorName.call(this,_0xaf42a7);
        };

        Sprite_SkillCard.prototype.partyMemberName = function(_0x1f0cc4)
        {
                return Compat_Window_Base.prototype.partyMemberName.call(this,_0x1f0cc4);
        };

        Sprite_SkillCard.prototype.processAutoColorWords = function(_0x3f324f)
        {
                return Compat_Window_Base.prototype.processAutoColorWords.call(this,_0x3f324f);
        };

        Sprite_SkillCard.prototype.processStoredAutoColorChanges = function(_0x4246b0)
        {
                return Compat_Window_Base.prototype.processStoredAutoColorChanges.call(this,_0x4246b0);
        };

        Sprite_SkillCard.prototype.clearActorNameAutoColor = function()
        {
                return Compat_Window_Base.prototype.clearActorNameAutoColor.call(this);
        };

        Sprite_SkillCard.prototype.registerActorNameAutoColorChanges = function()
        {
                return Compat_Window_Base.prototype.registerActorNameAutoColorChanges.call(this);
        };

        Sprite_SkillCard.prototype.processActorNameAutoColorChanges = function(_0x2b3914)
        {
                return Compat_Window_Base.prototype.processActorNameAutoColorChanges.call(this,_0x2b3914);
        };

        Sprite_SkillCard.prototype.databaseObjectName = function(_0x1b0522, _0x4b1f8c, _0x409b32)
        {
                return Compat_Window_Base.prototype.databaseObjectName.call(this,_0x1b0522, _0x4b1f8c, _0x409b32);
        };

        Sprite_SkillCard.prototype.lastGainedObjectIcon = function()
        {
                return Compat_Window_Base.prototype.lastGainedObjectIcon.call(this);
        };

        Sprite_SkillCard.prototype.lastGainedObjectName = function(_0xe0bab8)
        {
                return Compat_Window_Base.prototype.lastGainedObjectName.call(this,_0xe0bab8);
        };

        Sprite_SkillCard.prototype.lastGainedObjectQuantity = function()
        {
                return Compat_Window_Base.prototype.lastGainedObjectQuantity.call(this);
        };

        Sprite_SkillCard.prototype.applyDatabaseAutoColor = function(_0x538c2e, _0x3b4791)
        {
                return Compat_Window_Base.prototype.applyDatabaseAutoColor.call(this,_0x538c2e, _0x3b4791);
        };

        Sprite_SkillCard.prototype.prepareWordWrapEscapeCharacters = function(_0x648213)
        {
                return Compat_Window_Base.prototype.prepareWordWrapEscapeCharacters.call(this,_0x648213);
        };

        Sprite_SkillCard.prototype.addWrapBreakAfterPunctuation = function(_0x4ef9b7)
        {
                return Compat_Window_Base.prototype.addWrapBreakAfterPunctuation.call(this,_0x4ef9b7);
        };

        Sprite_SkillCard.prototype.processNewLine = function(_0x4bf4d0)
        {
                return Compat_Window_Base.prototype.processNewLine.call(this,_0x4bf4d0);
        };

        Sprite_SkillCard.prototype.processCharacter = function(_0x5cf8fa)
        {
                return Compat_Window_Base.prototype.processCharacter.call(this,_0x5cf8fa);
        };

        Sprite_SkillCard.prototype.processControlCharacter = function(_0x3c2439, _0xd97e11)
        {
                return Compat_Window_Base.prototype.processControlCharacter.call(this,_0x3c2439, _0xd97e11);
        };

        Sprite_SkillCard.prototype.obtainEscapeString = function(_0x4e3013)
        {
                return Compat_Window_Base.prototype.obtainEscapeString.call(this,_0x4e3013);
        };

        Sprite_SkillCard.prototype.processEscapeCharacter = function(_0xbc8d14, _0x34e2f6)
        {
                return Compat_Window_Base.prototype.processEscapeCharacter.call(this,_0xbc8d14, _0x34e2f6);
        };

        Sprite_SkillCard.prototype.processMessageCoreEscapeActions = function(_0x3573b4, _0x4d180d)
        {
                return Compat_Window_Base.prototype.processMessageCoreEscapeActions.call(this,_0x3573b4, _0x4d180d);
        };

        Sprite_SkillCard.prototype.makeFontBigger = function()
        {
                return Compat_Window_Base.prototype.makeFontBigger.call(this);
        };

        Sprite_SkillCard.prototype.makeFontSmaller = function()
        {
                return Compat_Window_Base.prototype.makeFontSmaller.call(this);
        };

        Sprite_SkillCard.prototype.processFsTextCode = function(_0x5bf7a8)
        {
                return Compat_Window_Base.prototype.processFsTextCode.call(this,_0x5bf7a8);
        };
		
        Sprite_SkillCard.prototype.maxFontSizeInLine = function(_0x3db72d)
        {
                return Compat_Window_Base.prototype.maxFontSizeInLine.call(this,_0x3db72d);
        };

        Sprite_SkillCard.prototype.processPxTextCode = function(_0xf3bf1a)
        {
                return Compat_Window_Base.prototype.processPxTextCode.call(this,_0xf3bf1a);
        };

        Sprite_SkillCard.prototype.processPyTextCode = function(_0x4ea7c6)
        {
                return Compat_Window_Base.prototype.processPyTextCode.call(this,_0x4ea7c6);
        };

        Sprite_SkillCard.prototype.processFontChangeBold = function(_0x25b936)
        {
                return Compat_Window_Base.prototype.processFontChangeBold.call(this,_0x25b936);
        };

        Sprite_SkillCard.prototype.processFontChangeItalic = function(_0x37fbf9)
        {
                return Compat_Window_Base.prototype.processFontChangeItalic.call(this,_0x37fbf9);
        };

        Sprite_SkillCard.prototype.processTextAlignmentChange = function(_0x3cbe2d)
        {
                return Compat_Window_Base.prototype.processTextAlignmentChange.call(this,_0x3cbe2d);
        };

        Sprite_SkillCard.prototype.processTextAlignmentX = function(_0x1f827f)
        {
                return Compat_Window_Base.prototype.processTextAlignmentX.call(this,_0x1f827f);
        };

        Sprite_SkillCard.prototype.textSizeExTextAlignment = function(_0x5f2a9d)
        {
                return Compat_Window_Base.prototype.textSizeExTextAlignment.call(this,_0x5f2a9d);
        };

        Sprite_SkillCard.prototype.processWrapBreak = function(_0x362622, _0x5d2d8f)
        {
                return Compat_Window_Base.prototype.processWrapBreak.call(this,_0x362622, _0x5d2d8f);
        };

        Sprite_SkillCard.prototype.textSizeExWordWrap = function(_0xd5314a)
        {
                return Compat_Window_Base.prototype.textSizeExWordWrap.call(this,_0xd5314a);
        };

        Sprite_SkillCard.prototype.processCommonEvent = function(_0xc5c3c6)
        {
                return Compat_Window_Base.prototype.processCommonEvent.call(this,_0xc5c3c6);
        };

        Sprite_SkillCard.prototype.processDrawPicture = function(_0x6559ab)
        {
                return Compat_Window_Base.prototype.processDrawPicture.call(this,_0x6559ab);
        };

        Sprite_SkillCard.prototype.drawBackPicture = function(_0x464c6c, _0x2af365, _0xbc23ad, _0x5c095b, _0x2c0ccb, _0x46cc50)
        {
                return Compat_Window_Base.prototype.drawBackPicture.call(this,_0x464c6c, _0x2af365, _0xbc23ad, _0x5c095b, _0x2c0ccb, _0x46cc50);
        };


        Sprite_SkillCard.prototype.drawTextEx = function (text, x, y)
        {
                return Compat_Window_Base.prototype.drawTextEx.call(this, text, x, y);
        };

        Sprite_SkillCard.prototype.drawText = function (text, x, y, maxWidth, align)
        {
                return Compat_Window_Base.prototype.drawText.call(this, text, x, y, maxWidth, align);
        }


        Sprite_SkillCard.prototype.processDrawCenteredPicture = function(_0x152f7d)
        {
                return Compat_Window_Base.prototype.processDrawCenteredPicture.call(this,_0x152f7d);
        };

        Sprite_SkillCard.prototype.drawBackCenteredPicture = function(_0x368bee, _0x27fa0e, _0x4eb7c)
        {
                return Compat_Window_Base.prototype.drawBackCenteredPicture.call(this,_0x368bee, _0x27fa0e, _0x4eb7c);
        };

        Sprite_SkillCard.prototype.processColorLock = function(_0xa7051a)
        {
                return Compat_Window_Base.prototype.processColorLock.call(this,_0xa7051a);
        };

        Sprite_SkillCard.prototype.processCustomWait = function(_0x1cc2b3)
        {
                return Compat_Window_Base.prototype.processCustomWait.call(this,_0x1cc2b3);
        };

        Sprite_SkillCard.prototype.processTextCasing = function(_0x1d3e87)
        {
                return Compat_Window_Base.prototype.processTextCasing.call(this,_0x1d3e87);
        };

        Sprite_SkillCard.prototype.loadMessageFace = function()
        {
                return Compat_Window_Base.prototype.loadMessageFace.call(this);
        };

        Sprite_SkillCard.prototype.drawMessageFace = function()
        {
                return Compat_Window_Base.prototype.drawMessageFace.call(this);
        };

        Sprite_SkillCard.prototype.setTextDelay = function()
        {
                return Compat_Window_Base.prototype.setTextDelay.call(this);
        };

///////////////////////////////////////
// END REGION Sprite_SkillCard
//////////////////////////////////////

///////////////////////////////////////
// REGION Window_CardList
//////////////////////////////////////

	Window_CardList.prototype.updateScrollBarPosition = function(_0x431c2c)
        {
            return Window_Base.prototype.updateScrollBarPosition.call(this,_0x431c2c);
        };
	
///////////////////////////////////////
// END REGION Window_CardList
//////////////////////////////////////

Window_ActorStatus.prototype.isFrameVisible = function() {
    return false;
};

Window_ActorStatus.prototype.extraHeight = function() {
  return 10;
};

Window_ActorStatus.prototype.itemHeight = function() {
  return this.innerHeight;
};


Window_ActorStatus.prototype.rowSpacing = function() {
  return 0;
};


Window_ActorStatus.prototype.drawBackgroundRect = function(_0x4b9278) {
    return Window_StatusBase.prototype.drawBackgroundRect.call(this, _0x4b9278);
};

if (Myth.BLK) {
    Myth.BLK.Window_PartyStatus_drawItemStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const nameX = this.nameX(rect);
        const nameY = this.nameY(rect);
        const stateIconX = this.stateIconX(rect);
        const stateIconY = this.stateIconY(rect);
        const basicGaugesX = this.basicGaugesX(rect);
        const basicGaugesY = this.basicGaugesY(rect);
        this.placeTimeGauge(actor, nameX, nameY);
        this.placeActorName(actor, nameX, nameY);
        this.placeStateIcon(actor, stateIconX, stateIconY);
        this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
    };
}


Window_PartyStatus.prototype.isFrameVisible = function() {
  return true;
};

Window_PartyStatus.prototype.extraHeight = function() {
  return 10;
};

Window_PartyStatus.prototype.itemHeight = function() {
  return Window_StatusBase.prototype.itemHeight.call(this);
};

Window_PartyStatus.prototype.rowSpacing = function() {
  return Window_StatusBase.prototype.rowSpacing.call(this);
};

Window_PartyStatus.prototype.drawBackgroundRect = function(_0x4b9278) {
    return Window_StatusBase.prototype.drawBackgroundRect.call(this, _0x4b9278);
};

Window_PartyStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
    this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
};

/*
Compat_Myth_VisuMZ.prototypes.Window_BattleStatus_drawItemImage = Window_BattleStatus.prototype.drawItemImage;
Window_ActorStatus.prototype.drawItemImage = function(_0x2828f9) {
  Compat_Myth_VisuMZ.prototypes.Window_BattleStatus_drawItemImage.call(this, _0x2828f9);
};*/

Window_PartyStatus.prototype.centerFrontViewSprite = function(_0x229837) {
  const _0x9f7103 = this.actor(_0x229837).battler();
  if(!_0x9f7103) {
    return;
  }
  const _0x1e3014 = this.battleLayoutStyle();
  const _0x35ccb5 = this.itemRect(_0x229837);
  let _0x2aaec1 = Math.round(_0x35ccb5.x + _0x35ccb5.width / 0x2) + this.padding;
  if(true) {
    _0x2aaec1 = _0x35ccb5.width / $gameParty.battleMembers().length;
    _0x2aaec1 *= _0x229837;
    _0x2aaec1 += _0x35ccb5.width / $gameParty.battleMembers().length / 0x2;
  }
  let _0x60c147 = Math.round(this.frontviewSpriteY(_0x229837, _0x9f7103, _0x35ccb5));
  _0x9f7103.setHome(_0x2aaec1, _0x60c147);
  this.addChildAt(_0x9f7103, 0x1);
  _0x9f7103.show();
  this.updateEffectsContainer();
  this.updateAttachmentSprites();
};

Window_BattleStatus.prototype.centerFrontViewSprite = function(_0x229837) {
  const _0x9f7103 = this.actor(_0x229837).battler();
  if(!_0x9f7103) {
    return;
  }
  const _0x1e3014 = this.battleLayoutStyle();
  const _0x35ccb5 = this.itemRect(_0x229837);
  let _0x2aaec1 = Math.round(_0x35ccb5.x + _0x35ccb5.width / 0x2) + this.padding;
  if(false) {
    _0x2aaec1 = _0x35ccb5.width / $gameParty.battleMembers().length;
    _0x2aaec1 *= _0x229837;
    _0x2aaec1 += _0x35ccb5.width / $gameParty.battleMembers().length / 0x2;
  }
  let _0x60c147 = Math.round(this.frontviewSpriteY(_0x229837, _0x9f7103, _0x35ccb5));
  _0x9f7103.setHome(_0x2aaec1, _0x60c147);
  this.addChildAt(_0x9f7103, 0x1);
  _0x9f7103.show();
  this.updateEffectsContainer();
  this.updateAttachmentSprites();
};

})();
