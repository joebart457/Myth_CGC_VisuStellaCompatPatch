//=============================================================================
// RPG Maker MZ - MYTH_VisuMZ_CompatPatch
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Compatability patch between MYTH_CGC_CoreEngine (Version 1.6.4) and VisuMZ_1_BattleCore (Version 1.87)
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
Compat_Myth_VisuMZ.minorVersion = 0;

(() => {
    const pluginName = "MYTH_VisuMZ_CompatPatch";

///////////////////////////////////////
// REGION Sprite_SkillCard
//////////////////////////////////////

Sprite_SkillCard.prototype.initDigitGrouping = function ()
{
        return Window_Base.prototype.initDigitGrouping ();
};

Sprite_SkillCard.prototype.lineHeight = function ()
{
        return Window_Base.prototype.lineHeight ();
};

Sprite_SkillCard.prototype.itemPadding = function ()
{
        return Window_Base.prototype.itemPadding ();
};

Sprite_SkillCard.prototype.updateBackOpacity = function ()
{
        return Window_Base.prototype.updateBackOpacity ();
};

Sprite_SkillCard.prototype.translucentOpacity = function ()
{
        return Window_Base.prototype.translucentOpacity ();
};

Sprite_SkillCard.prototype.openingSpeed = function ()
{
        return Window_Base.prototype.openingSpeed ();
};


Sprite_SkillCard.prototype.useDigitGrouping = function ()
{
        return Window_Base.prototype.useDigitGrouping ();
};

/*Sprite_SkillCard.prototype.createTextState = function (_0x1824e2, _0x49e87b, _0x1181b1, _0x355711)
{
        return Window_Base.prototype.createTextState (_0x1824e2, _0x49e87b, _0x1181b1, _0x355711);
};*/

Sprite_SkillCard.prototype.useDigitGroupingEx = function ()
{
        return Window_Base.prototype.useDigitGroupingEx ();
};

Sprite_SkillCard.prototype.enableDigitGrouping = function (_0x38304b)
{
        return Window_Base.prototype.enableDigitGrouping (_0x38304b);
};

Sprite_SkillCard.prototype.enableDigitGroupingEx = function (_0x45bd98)
{
        return Window_Base.prototype.enableDigitGroupingEx (_0x45bd98);
};

Sprite_SkillCard.prototype.drawIcon = function (_0x42a305, _0x5c684a, _0x1d872c)
{
        return Window_Base.prototype.drawIcon (_0x42a305, _0x5c684a, _0x1d872c);
};

Sprite_SkillCard.prototype.drawFace = function (_0x14aa4e, _0x11130c, _0x2b3974, _0xd0e37f, _0x2689eb, _0x54dbb7)
{
        return Window_Base.prototype.drawFace (_0x14aa4e, _0x11130c, _0x2b3974, _0xd0e37f, _0x2689eb, _0x54dbb7);
};

Sprite_SkillCard.prototype.drawCharacter = function (_0x414541, _0x29a7bf, _0x2fe065, _0x2391ae)
{
        return Window_Base.prototype.drawCharacter (_0x414541, _0x29a7bf, _0x2fe065, _0x2391ae);
};

Sprite_SkillCard.prototype.initCoreEasing = function ()
{
        return Window_Base.prototype.initCoreEasing ();
};

Sprite_SkillCard.prototype.updateCoreEasing = function ()
{
        return Window_Base.prototype.updateCoreEasing ();
};

Sprite_SkillCard.prototype.applyCoreEasing = function (_0x580acb, _0x5f4750)
{
        return Window_Base.prototype.applyCoreEasing (_0x580acb, _0x5f4750);
};

Sprite_SkillCard.prototype.calcCoreEasing = function (_0x59e8f0)
{
        return Window_Base.prototype.calcCoreEasing (_0x59e8f0);
};

Sprite_SkillCard.prototype.anchorCoreEasing = function (_0xbeb209, _0x24dc70)
{
        return Window_Base.prototype.anchorCoreEasing (_0xbeb209, _0x24dc70);
};

Sprite_SkillCard.prototype.setupCoreEasing = function (_0x190cdb, _0x2ae548, _0x3bf4ff, _0x52c563, _0x5b630f, _0x229d78, _0x5b8ce3, _0x20e5be, _0x48b52d)
{
        return Window_Base.prototype.setupCoreEasing (_0x190cdb, _0x2ae548, _0x3bf4ff, _0x52c563, _0x5b630f, _0x229d78, _0x5b8ce3, _0x20e5be, _0x48b52d);
};

Sprite_SkillCard.prototype.drawCurrencyValue = function (_0xa5f926, _0x3042d3, _0x436e74, _0x2417f2, _0x4b6392)
{
        return Window_Base.prototype.drawCurrencyValue (_0xa5f926, _0x3042d3, _0x436e74, _0x2417f2, _0x4b6392);
};

Sprite_SkillCard.prototype.drawIconBySize = function (_0x280867, _0x549aef, _0xf69b4c, _0x456c2a, _0x28ac47)
{
        return Window_Base.prototype.drawIconBySize (_0x280867, _0x549aef, _0xf69b4c, _0x456c2a, _0x28ac47);
};

Sprite_SkillCard.prototype.drawGauge = function (_0xdd76f7, _0x3cfe4a, _0x23a555, _0x1987c2, _0x587ad0, _0xb6709a)
{
        return Window_Base.prototype.drawGauge (_0xdd76f7, _0x3cfe4a, _0x23a555, _0x1987c2, _0x587ad0, _0xb6709a);
};

Sprite_SkillCard.prototype.isScrollBarVisible = function ()
{
        return Window_Base.prototype.isScrollBarVisible ();
};

Sprite_SkillCard.prototype.createScrollBarSprites = function ()
{
        return Window_Base.prototype.createScrollBarSprites ();
};

Sprite_SkillCard.prototype.setupScrollBarBitmap = function (_0x217aaf)
{
        return Window_Base.prototype.setupScrollBarBitmap (_0x217aaf);
};

Sprite_SkillCard.prototype.destroyScrollBarBitmaps = function ()
{
        return Window_Base.prototype.destroyScrollBarBitmaps ();
};

Sprite_SkillCard.prototype.updateScrollBarPosition = function (_0x431c2c)
{
        return Window_Base.prototype.updateScrollBarPosition (_0x431c2c);
};

Sprite_SkillCard.prototype.processDrawIcon = function (_0x52962c, _0x421c97)
{
        return Window_Base.prototype.processDrawIcon (_0x52962c, _0x421c97);
};

Sprite_SkillCard.prototype.createDimmerSprite = function ()
{
        return Window_Base.prototype.createDimmerSprite ();
};

Sprite_SkillCard.prototype.refreshDimmerBitmap = function ()
{
        return Window_Base.prototype.refreshDimmerBitmap ();
};

Sprite_SkillCard.prototype.initMessageCore = function (_0xf217c3)
{
        return Window_Base.prototype.initMessageCore (_0xf217c3);
};

Sprite_SkillCard.prototype.initTextAlignement = function ()
{
        return Window_Base.prototype.initTextAlignement ();
};

Sprite_SkillCard.prototype.setTextAlignment = function (_0x41aa11)
{
        return Window_Base.prototype.setTextAlignment (_0x41aa11);
};

Sprite_SkillCard.prototype.getTextAlignment = function ()
{
        return Window_Base.prototype.getTextAlignment ();
};

Sprite_SkillCard.prototype.textSizeEx = function (_0x9e4181)
{
        return Window_Base.prototype.textSizeEx (_0x9e4181);
};

Sprite_SkillCard.prototype.textSizeExRaw = function (_0x2f7502)
{
        return Window_Base.prototype.textSizeExRaw (_0x2f7502);
};

/*Sprite_SkillCard.prototype.processAllText = function (_0x52fc0d)
{
        return Window_Base.prototype.processAllText (_0x52fc0d);
};*/

Sprite_SkillCard.prototype.resetWordWrap = function ()
{
        return Window_Base.prototype.resetWordWrap ();
};

Sprite_SkillCard.prototype.isWordWrapEnabled = function ()
{
        return Window_Base.prototype.isWordWrapEnabled ();
};

Sprite_SkillCard.prototype.setWordWrap = function (_0x34a23e)
{
        return Window_Base.prototype.setWordWrap (_0x34a23e);
};

Sprite_SkillCard.prototype.registerResetRect = function (_0x1a068f)
{
        return Window_Base.prototype.registerResetRect (_0x1a068f);
};

Sprite_SkillCard.prototype.resetTextColor = function ()
{
        return Window_Base.prototype.resetTextColor ();
};

Sprite_SkillCard.prototype.setColorLock = function (_0x354725)
{
        return Window_Base.prototype.setColorLock (_0x354725);
};

Sprite_SkillCard.prototype.isColorLocked = function ()
{
        return Window_Base.prototype.isColorLocked ();
};

Sprite_SkillCard.prototype.isAutoColorAffected = function ()
{
        return Window_Base.prototype.isAutoColorAffected ();
};

Sprite_SkillCard.prototype.getPreservedFontSettings = function ()
{
        return Window_Base.prototype.getPreservedFontSettings ();
};

Sprite_SkillCard.prototype.returnPreservedFontSettings = function (_0x407b22)
{
        return Window_Base.prototype.returnPreservedFontSettings (_0x407b22);
};

Sprite_SkillCard.prototype.canMove = function ()
{
        return Window_Base.prototype.canMove ();
};

Sprite_SkillCard.prototype.updateMove = function ()
{
        return Window_Base.prototype.updateMove ();
};

Sprite_SkillCard.prototype.clampPlacementPosition = function (_0x20311d, _0x743a7f)
{
        return Window_Base.prototype.clampPlacementPosition (_0x20311d, _0x743a7f);
};

Sprite_SkillCard.prototype.applyMoveEasing = function (_0xd726f6, _0x3e0d6e)
{
        return Window_Base.prototype.applyMoveEasing (_0xd726f6, _0x3e0d6e);
};

Sprite_SkillCard.prototype.calcMoveEasing = function (_0x3da18f)
{
        return Window_Base.prototype.calcMoveEasing (_0x3da18f);
};

Sprite_SkillCard.prototype.moveTo = function (_0x471789, _0x7be898, _0x5c17bc, _0x15eb4a, _0x3cdd2c, _0x51f8e9)
{
        return Window_Base.prototype.moveTo (_0x471789, _0x7be898, _0x5c17bc, _0x15eb4a, _0x3cdd2c, _0x51f8e9);
};

Sprite_SkillCard.prototype.moveBy = function (_0x5211dd, _0x7b127, _0x2a1764, _0x429b1d, _0x35ade4, _0x3bf7d2)
{
        return Window_Base.prototype.moveBy (_0x5211dd, _0x7b127, _0x2a1764, _0x429b1d, _0x35ade4, _0x3bf7d2);
};

Sprite_SkillCard.prototype.resetRect = function (_0x4c5f60, _0x3a91b7)
{
        return Window_Base.prototype.resetRect (_0x4c5f60, _0x3a91b7);
};

Sprite_SkillCard.prototype.changeTextColor = function (_0x3bf0cb)
{
        return Window_Base.prototype.changeTextColor (_0x3bf0cb);
};

Sprite_SkillCard.prototype.processPreviousColor = function (_0x3cd6d9)
{
        return Window_Base.prototype.processPreviousColor (_0x3cd6d9);
};

Sprite_SkillCard.prototype.convertEscapeCharacters = function (_0x261929)
{
        return Window_Base.prototype.convertEscapeCharacters (_0x261929);
};

Sprite_SkillCard.prototype.convertTextMacros = function (_0x51003e)
{
        return Window_Base.prototype.convertTextMacros (_0x51003e);
};

Sprite_SkillCard.prototype.convertBackslashCharacters = function (_0x3419e8)
{
        return Window_Base.prototype.convertBackslashCharacters (_0x3419e8);
};

Sprite_SkillCard.prototype.convertVariableEscapeCharacters = function (_0x45b632)
{
        return Window_Base.prototype.convertVariableEscapeCharacters (_0x45b632);
};

Sprite_SkillCard.prototype.convertButtonAssistEscapeCharacters = function (_0x2be29)
{
        return Window_Base.prototype.convertButtonAssistEscapeCharacters (_0x2be29);
};

Sprite_SkillCard.prototype.convertButtonAssistText = function (_0x15cb8e)
{
        return Window_Base.prototype.convertButtonAssistText (_0x15cb8e);
};

Sprite_SkillCard.prototype.preConvertEscapeCharacters = function (_0x5a4d67)
{
        return Window_Base.prototype.preConvertEscapeCharacters (_0x5a4d67);
};

Sprite_SkillCard.prototype.switchOutTextForLocalization = function (_0x393333)
{
        return Window_Base.prototype.switchOutTextForLocalization (_0x393333);
};

Sprite_SkillCard.prototype.postConvertEscapeCharacters = function (_0x38c692)
{
        return Window_Base.prototype.postConvertEscapeCharacters (_0x38c692);
};

Sprite_SkillCard.prototype.convertShowChoiceEscapeCodes = function (_0x2a0cbc)
{
        return Window_Base.prototype.convertShowChoiceEscapeCodes (_0x2a0cbc);
};

Sprite_SkillCard.prototype.isChoiceWindow = function ()
{
        return Window_Base.prototype.isChoiceWindow ();
};

Sprite_SkillCard.prototype.convertFontSettingsEscapeCharacters = function (_0x2cd842)
{
        return Window_Base.prototype.convertFontSettingsEscapeCharacters (_0x2cd842);
};

Sprite_SkillCard.prototype.convertTextAlignmentEscapeCharacters = function (_0x2f1aa3)
{
        return Window_Base.prototype.convertTextAlignmentEscapeCharacters (_0x2f1aa3);
};

Sprite_SkillCard.prototype.convertLockColorsEscapeCharacters = function (_0x4c0c34)
{
        return Window_Base.prototype.convertLockColorsEscapeCharacters (_0x4c0c34);
};

Sprite_SkillCard.prototype.convertCasingEscapeCharacters = function (_0x5aa68e)
{
        return Window_Base.prototype.convertCasingEscapeCharacters (_0x5aa68e);
};

Sprite_SkillCard.prototype.convertBaseEscapeCharacters = function (_0x5c04aa)
{
        return Window_Base.prototype.convertBaseEscapeCharacters (_0x5c04aa);
};

Sprite_SkillCard.prototype.convertHardcodedEscapeReplacements = function (_0x48af2c)
{
        return Window_Base.prototype.convertHardcodedEscapeReplacements (_0x48af2c);
};

Sprite_SkillCard.prototype.battleTargetName = function ()
{
        return Window_Base.prototype.battleTargetName ();
};

Sprite_SkillCard.prototype.battleUserName = function ()
{
        return Window_Base.prototype.battleUserName ();
};

Sprite_SkillCard.prototype.battleActionName = function (_0x59d4dd)
{
        return Window_Base.prototype.battleActionName (_0x59d4dd);
};

Sprite_SkillCard.prototype.convertMessageCoreEscapeActions = function (_0x2a433a)
{
        return Window_Base.prototype.convertMessageCoreEscapeActions (_0x2a433a);
};

Sprite_SkillCard.prototype.convertMessageCoreEscapeReplacements = function (_0x252b4e)
{
        return Window_Base.prototype.convertMessageCoreEscapeReplacements (_0x252b4e);
};

Sprite_SkillCard.prototype.actorName = function (_0xaf42a7)
{
        return Window_Base.prototype.actorName (_0xaf42a7);
};

Sprite_SkillCard.prototype.partyMemberName = function (_0x1f0cc4)
{
        return Window_Base.prototype.partyMemberName (_0x1f0cc4);
};

Sprite_SkillCard.prototype.processAutoColorWords = function (_0x3f324f)
{
        return Window_Base.prototype.processAutoColorWords (_0x3f324f);
};

Sprite_SkillCard.prototype.processStoredAutoColorChanges = function (_0x4246b0)
{
        return Window_Base.prototype.processStoredAutoColorChanges (_0x4246b0);
};

Sprite_SkillCard.prototype.clearActorNameAutoColor = function ()
{
        return Window_Base.prototype.clearActorNameAutoColor ();
};

Sprite_SkillCard.prototype.registerActorNameAutoColorChanges = function ()
{
        return Window_Base.prototype.registerActorNameAutoColorChanges ();
};

Sprite_SkillCard.prototype.processActorNameAutoColorChanges = function (_0x2b3914)
{
        return Window_Base.prototype.processActorNameAutoColorChanges (_0x2b3914);
};

Sprite_SkillCard.prototype.databaseObjectName = function (_0x1b0522, _0x4b1f8c, _0x409b32)
{
        return Window_Base.prototype.databaseObjectName (_0x1b0522, _0x4b1f8c, _0x409b32);
};

Sprite_SkillCard.prototype.lastGainedObjectIcon = function ()
{
        return Window_Base.prototype.lastGainedObjectIcon ();
};

Sprite_SkillCard.prototype.lastGainedObjectName = function (_0xe0bab8)
{
        return Window_Base.prototype.lastGainedObjectName (_0xe0bab8);
};

Sprite_SkillCard.prototype.lastGainedObjectQuantity = function ()
{
        return Window_Base.prototype.lastGainedObjectQuantity ();
};

Sprite_SkillCard.prototype.applyDatabaseAutoColor = function (_0x538c2e, _0x3b4791)
{
        return Window_Base.prototype.applyDatabaseAutoColor (_0x538c2e, _0x3b4791);
};

Sprite_SkillCard.prototype.prepareWordWrapEscapeCharacters = function (_0x648213)
{
        return Window_Base.prototype.prepareWordWrapEscapeCharacters (_0x648213);
};

Sprite_SkillCard.prototype.addWrapBreakAfterPunctuation = function (_0x4ef9b7)
{
        return Window_Base.prototype.addWrapBreakAfterPunctuation (_0x4ef9b7);
};

/*Sprite_SkillCard.prototype.processNewLine = function (_0x4bf4d0)
{
        return Window_Base.prototype.processNewLine (_0x4bf4d0);
};*/

Sprite_SkillCard.prototype.processCharacter = function (_0x5cf8fa)
{
        return Window_Base.prototype.processCharacter (_0x5cf8fa);
};

Sprite_SkillCard.prototype.processControlCharacter = function (_0x3c2439, _0xd97e11)
{
        return Window_Base.prototype.processControlCharacter (_0x3c2439, _0xd97e11);
};

Sprite_SkillCard.prototype.obtainEscapeString = function (_0x4e3013)
{
        return Window_Base.prototype.obtainEscapeString (_0x4e3013);
};

Sprite_SkillCard.prototype.processEscapeCharacter = function (_0xbc8d14, _0x34e2f6)
{
        return Window_Base.prototype.processEscapeCharacter (_0xbc8d14, _0x34e2f6);
};

Sprite_SkillCard.prototype.processMessageCoreEscapeActions = function (_0x3573b4, _0x4d180d)
{
        return Window_Base.prototype.processMessageCoreEscapeActions (_0x3573b4, _0x4d180d);
};

Sprite_SkillCard.prototype.makeFontBigger = function ()
{
        return Window_Base.prototype.makeFontBigger ();
};

Sprite_SkillCard.prototype.makeFontSmaller = function ()
{
        return Window_Base.prototype.makeFontSmaller ();
};

Sprite_SkillCard.prototype.processFsTextCode = function (_0x5bf7a8)
{
        return Window_Base.prototype.processFsTextCode (_0x5bf7a8);
};
        
/*Sprite_SkillCard.prototype.maxFontSizeInLine = function (_0x3db72d)
{
        return Window_Base.prototype.maxFontSizeInLine (_0x3db72d);
};*/

Sprite_SkillCard.prototype.processPxTextCode = function (_0xf3bf1a)
{
        return Window_Base.prototype.processPxTextCode (_0xf3bf1a);
};

Sprite_SkillCard.prototype.processPyTextCode = function (_0x4ea7c6)
{
        return Window_Base.prototype.processPyTextCode (_0x4ea7c6);
};

Sprite_SkillCard.prototype.processFontChangeBold = function (_0x25b936)
{
        return Window_Base.prototype.processFontChangeBold (_0x25b936);
};

Sprite_SkillCard.prototype.processFontChangeItalic = function (_0x37fbf9)
{
        return Window_Base.prototype.processFontChangeItalic (_0x37fbf9);
};

Sprite_SkillCard.prototype.processTextAlignmentChange = function (_0x3cbe2d)
{
        return Window_Base.prototype.processTextAlignmentChange (_0x3cbe2d);
};

Sprite_SkillCard.prototype.processTextAlignmentX = function (_0x1f827f)
{
        return Window_Base.prototype.processTextAlignmentX (_0x1f827f);
};

Sprite_SkillCard.prototype.textSizeExTextAlignment = function (_0x5f2a9d)
{
        return Window_Base.prototype.textSizeExTextAlignment (_0x5f2a9d);
};

Sprite_SkillCard.prototype.processWrapBreak = function (_0x362622, _0x5d2d8f)
{
        return Window_Base.prototype.processWrapBreak (_0x362622, _0x5d2d8f);
};

Sprite_SkillCard.prototype.textSizeExWordWrap = function (_0xd5314a)
{
        return Window_Base.prototype.textSizeExWordWrap (_0xd5314a);
};

Sprite_SkillCard.prototype.processCommonEvent = function (_0xc5c3c6)
{
        return Window_Base.prototype.processCommonEvent (_0xc5c3c6);
};

Sprite_SkillCard.prototype.processDrawPicture = function (_0x6559ab)
{
        return Window_Base.prototype.processDrawPicture (_0x6559ab);
};

Sprite_SkillCard.prototype.drawBackPicture = function (_0x464c6c, _0x2af365, _0xbc23ad, _0x5c095b, _0x2c0ccb, _0x46cc50)
{
        return Window_Base.prototype.drawBackPicture (_0x464c6c, _0x2af365, _0xbc23ad, _0x5c095b, _0x2c0ccb, _0x46cc50);
};

Sprite_SkillCard.prototype.processDrawCenteredPicture = function (_0x152f7d)
{
        return Window_Base.prototype.processDrawCenteredPicture (_0x152f7d);
};

Sprite_SkillCard.prototype.drawBackCenteredPicture = function (_0x368bee, _0x27fa0e, _0x4eb7c)
{
        return Window_Base.prototype.drawBackCenteredPicture (_0x368bee, _0x27fa0e, _0x4eb7c);
};

Sprite_SkillCard.prototype.processColorLock = function (_0xa7051a)
{
        return Window_Base.prototype.processColorLock (_0xa7051a);
};

Sprite_SkillCard.prototype.processCustomWait = function (_0x1cc2b3)
{
        return Window_Base.prototype.processCustomWait (_0x1cc2b3);
};

Sprite_SkillCard.prototype.processTextCasing = function (_0x1d3e87)
{
        return Window_Base.prototype.processTextCasing (_0x1d3e87);
};

Sprite_SkillCard.prototype.loadMessageFace = function ()
{
        return Window_Base.prototype.loadMessageFace ();
};

Sprite_SkillCard.prototype.drawMessageFace = function ()
{
        return Window_Base.prototype.drawMessageFace ();
};

Sprite_SkillCard.prototype.setTextDelay = function ()
{
        return Window_Base.prototype.setTextDelay ();
};

///////////////////////////////////////
// END REGION Sprite_SkillCard
//////////////////////////////////////

///////////////////////////////////////
// REGION Window_CardList
//////////////////////////////////////

Window_CardList.prototype.updateScrollBarPosition = function (_0x431c2c)
{
        return Window_Base.prototype.updateScrollBarPosition (_0x431c2c);
};
	
///////////////////////////////////////
// END REGION Window_CardList
//////////////////////////////////////

///////////////////////////////////////
// REGION Window_ActorStatus
//////////////////////////////////////

Window_ActorStatus.prototype.isFrameVisible = function () {
    return false;
};

Window_ActorStatus.prototype.extraHeight = function () {
  return 10;
};

Window_ActorStatus.prototype.itemHeight = function () {
  return this.innerHeight;
};


Window_ActorStatus.prototype.rowSpacing = function () {
  return 0;
};


Window_ActorStatus.prototype.drawBackgroundRect = function (_0x4b9278) {
    return Window_StatusBase.prototype.drawBackgroundRect.call(this, _0x4b9278);
};

///////////////////////////////////////
// END REGION Window_ActorStatus
//////////////////////////////////////


///////////////////////////////////////
// REGION Window_PartyStatus
//////////////////////////////////////

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



Window_PartyStatus.prototype.isFrameVisible = function () {
  return true;
};

Window_PartyStatus.prototype.extraHeight = function () {
  return 10;
};

Window_PartyStatus.prototype.itemHeight = function () {
  return Window_StatusBase.prototype.itemHeight.call(this);
};

Window_PartyStatus.prototype.rowSpacing = function () {
  return Window_StatusBase.prototype.rowSpacing.call(this);
};

Window_PartyStatus.prototype.drawBackgroundRect = function (_0x4b9278) {
    return Window_StatusBase.prototype.drawBackgroundRect.call(this, _0x4b9278);
};

Window_PartyStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
    this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
};

/*
Compat_Myth_VisuMZ.prototypes.Window_BattleStatus_drawItemImage = Window_BattleStatus.prototype.drawItemImage;
Window_ActorStatus.prototype.drawItemImage = function (_0x2828f9) {
  Compat_Myth_VisuMZ.prototypes.Window_BattleStatus_drawItemImage.call(this, _0x2828f9);
};*/

Window_PartyStatus.prototype.centerFrontViewSprite = function (_0x229837) {
  const _0x9f7103 = this.actor(_0x229837).battler();
  if (!_0x9f7103) {
    return;
  }
  const _0x1e3014 = this.battleLayoutStyle();
  const _0x35ccb5 = this.itemRect(_0x229837);
  let _0x2aaec1 = Math.round(_0x35ccb5.x + _0x35ccb5.width / 0x2) + this.padding;
  if (true) {
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

Window_BattleStatus.prototype.centerFrontViewSprite = function (_0x229837) {
  const _0x9f7103 = this.actor(_0x229837).battler();
  if (!_0x9f7103) {
    return;
  }
  const _0x1e3014 = this.battleLayoutStyle();
  const _0x35ccb5 = this.itemRect(_0x229837);
  let _0x2aaec1 = Math.round(_0x35ccb5.x + _0x35ccb5.width / 0x2) + this.padding;
  if (false) {
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

///////////////////////////////////////
// END REGION Window_PartyStatus
//////////////////////////////////////

})();
