const statDefinitions = [
  { key: "hp", label: "HP", suffix: "" },
  { key: "effectiveHealth", label: "Effective Health", suffix: "" },
  { key: "posture", label: "Posture", suffix: "" },
  { key: "reiatsu", label: "Reiatsu", suffix: "" },
  { key: "defense", label: "Defense", suffix: "%" },
  { key: "regenPerSecond", label: "Regen / Sec", suffix: "" },
  { key: "meterGain", label: "Meter Gain", suffix: "%" },
  { key: "reducedMeterDrain", label: "Reduced Meter Drain", suffix: "%" },
  { key: "modeDuration", label: "Mode Duration", suffix: "%" },
  { key: "specialDuration", label: "Special Duration", suffix: "%" },
];

const baseStats = {
  hp: 375,
  effectiveHealth: 375,
  posture: 77,
  reiatsu: 370,
  defense: 0,
  regenPerSecond: 0,
  meterGain: 0,
  reducedMeterDrain: 0,
  modeDuration: 0,
  specialDuration: 0,
};

const accessorySlots = [
  "head",
  "face",
  "neck",
  "shoulder",
  "torso",
  "back",
  "waist",
  "arm",
  "leg",
  "emblem",
];

const races = [
  ["shinigami", "Shinigami", "Gotei 13", "Unlocks Shinigami clans and Vizard-related clan bonuses.", ["Soul Reaper", "Vizard"]],
  ["hollow", "Hollow", "Hollow Line", "Unlocks Hollow clans and their Hollow-specific passives.", ["Hollow", "Arrancar"]],
  ["quincy", "Quincy", "Wandenreich", "Unlocks Quincy clans and Letz-related clan bonuses.", ["Quincy", "Letz"]],
  ["fullbringer", "Fullbringer", "Outlaws", "Unlocks Fullbringer clans and Outlaw clan options.", ["Fullbring", "Utility"]],
].map(([id, name, topline, description, tags]) => ({ id, name, topline, description, tags }));

const clans = [
  ["sozosei","shinigami","Sozosei","Mythical","1%",10,8,10,5,7,"Vizard Duration","Enlightenment","Taking an attack two times will trigger you to adapt to it and will have defense against that attack for the next 5 minutes."],
  ["aizen","shinigami","Aizen","Mythical","1%",20,20,0,2,10,"Vizard Duration","Kyoka Fusa","Every seven parries, a black box spawns. If it is blocked or lands, you gain reiatsu and sub-mode, and on M1s your opponent's HP and Reiatsu bars become unreadable."],
  ["urahara","shinigami","Urahara","Legendary","3%",15,5,5,3,0,"","Blood Pact","Consume HP or Blood for a little speed boost and reiatsu pack."],
  ["yamamoto","shinigami","Yamamoto","Legendary","3%",25,0,20,0,0,"","Burn Immunity","All burn damage and proc burns do not apply to you, and every fifth M1 procs slight burn."],
  ["hyosube","shinigami","Hyosube","Legendary","3%",5,3,3,3,0,"","Nameless Wave","Throw out a wave of ink. If it lands, it censors half the target's name and reduces their rei regen by 50%."],
  ["zaraki","shinigami","Zaraki","Legendary","3%",15,15,5,0,0,"","Killing Intent","People you hit have a longer combat tag duration, and you do more damage the longer you fight, up to 5%."],
  ["shutara","shinigami","Shutara","Legendary","3%",20,10,15,0,0,"","Kido Perfection","The more Kido skill tree points you have, the slightly higher Reiatsu Regen you get."],
  ["tsunayashiro","shinigami","Tsunayashiro","Legendary","3%",25,15,15,0,0,"","Analytical Expert","Can briefly see the Reiatsu of everyone around you for 5 seconds."],
  ["shihouin","shinigami","Shihouin","Legendary","3%",20,15,20,0,0,"","Faster Flashstep","Flashstep dashes are increased greatly."],
  ["ikomikidomoe","hollow","Ikomikidomoe","Mythical","1%",15,10,5,5,0,"","Supreme King","When someone deals 150 damage to you, their screen turns slightly red, their rei regen is reduced, and all healing is halved."],
  ["hikone","hollow","Hikone","Mythical","1%",20,3,8,0,0,"","Reversal Doctrine","Every parry makes your opponent gain 5% of the attack's block damage as posture. If they exceed 100%, they are guard broken."],
  ["starrk","hollow","Starrk","Legendary","3%",15,15,5,3,0,"","Cero Connoisseur","Slightly raises all cero scalings."],
  ["odelschwanck","hollow","Odelschwanck","Legendary","3%",20,15,20,0,0,"","Reiatsu Detection","Move with cooldown, then press to see where everyone on the map is by red highlights, without names."],
  ["louisenbairn","hollow","Louisenbairn","Legendary","3%",15,5,15,3,0,"","Enhanced Hierro","+5 Hierro and +2.5% defense. If on Hierro variant, no additional Hierro is given."],
  ["jagerjaquez","hollow","Jagerjaquez","Legendary","3%",15,15,5,0,0,"","Will of the King","Does a unique animation and scream, then gains a slight speed boost and damage boost."],
  ["cifer","hollow","Cifer","Legendary","3%",15,0,15,3,0,"","Powered Bala","Bala gets a higher cooldown but now autotracks."],
  ["ishida","quincy","Ishida","Mythical","1%",10,10,0,5,5,"Letz Duration","Reishi Dominance","When you run out of reiatsu, you get a 10% Reiatsu pack on a high cooldown."],
  ["kurosaki","quincy","Kurosaki","Mythical","1%",15,5,15,0,10,"Letz Duration","Savior","When below 50% reiatsu, you gain a glowing blue aura and slight buffs."],
  ["du","quincy","Du","Legendary","3%",0,5,5,0,0,"","Iron Tank","10% chance to tank 80% of incoming damage."],
  ["valkyrie","quincy","Valkyrie","Legendary","3%",10,15,0,5,0,"","Miraculous Convenience","50% defense pen when below 50% HP and -5% defense when below 50% rei."],
  ["b","quincy","B","Legendary","3%",25,15,5,0,0,"","Burn Immunity","All burn damage and proc burns do not apply to you, and every fifth M1 procs slight burn."],
  ["parnkgjas","quincy","Parnkgjas","Legendary","3%",5,5,10,3,0,"","Skill Perfection","After 3 skills used, one of those skills refreshes completely."],
  ["le-vaar","quincy","Le Vaar","Legendary","3%",10,15,20,3,0,"","Death Perfection","Dying does not give anyone a health pack, and more combat tags on you means more defense."],
  ["barro","quincy","Barro","Legendary","3%",15,10,25,0,0,"","Fifth Verdict","Every five arrow shots, the fifth autotracks. Every five landed arrow shots, the fifth becomes a Letzt Stil arrow."],
  ["haschwalth","quincy","Haschwalth","Legendary","3%",20,5,5,5,0,"","The Balance","A cooldown skill that gives 0.7 seconds of pure reflection and cannot be used in stun."],
  ["ubuginu","fullbringer","Ubuginu","Mythical","1%",20,8,10,6,0,"","Rewarded By Perfection","Dealing enough damage without being hit makes your next skill cost no reiatsu."],
  ["orihime","fullbringer","Orihime","Legendary","3%",5,0,10,0,0,"","One Last Miracle","Escape death once with a slight heal over time."],
  ["sado","fullbringer","Sado","Legendary","3%",15,10,5,0,0,"","Posture Regeneration","Regenerate posture over time."],
  ["ginjo","fullbringer","Ginjo","Legendary","3%",15,15,0,15,0,"","Siphon","When hitting a player, you steal their reiatsu based on how much they currently have."],
  ["tsukushima","fullbringer","Tsukushima","Legendary","3%",15,5,0,9,0,"","Amnesia","After dealing enough damage, the target forgets a random toolbar move for some time."],
  ["michibane","fullbringer","Michibane","Legendary","3%",25,0,20,7,0,"","Reliance","When someone in your party gets knocked, you gain a speed and damage boost for one minute."],
].map(([id, race, name, rarity, dropRate, hp, posture, reiatsu, modeDuration, specialDuration, specialLabel, passiveName, passive]) => ({
  id,
  race,
  name,
  rarity,
  dropRate,
  passiveName,
  passive,
  specialLabel,
  bonuses: { hp, posture, reiatsu, defense: 0, meterGain: 0, reducedMeterDrain: 0, modeDuration, specialDuration },
}));

const accessories = [
  ["head", "nerd-o-lantern", "Nerd o' lantern", 10, 5, 10, 5, 0, 0],
  ["head", "vampire-hunter-hat", "Vampire Hunter Hat", 15, 1, 5, 0, 0, 0],
  ["head", "white-kirishima-horns", "White Kirishima Horns", 5, 1, 5, 3, 3, 0],
  ["head", "laurel-crown", "Laurel Crown", 15, 0, 5, 2.5, 0, 0],
  ["head", "spectral-crown", "Spectral Crown", 8, 2, 15, 2.5, 0, 0],
  ["face", "reinvent-diadem", "Reinvent Diadem", 10, 2, 10, 2.5, 4, 0],
  ["head", "benevolent-scarlet", "Benevolent Scarlet", 4, 3, 0, 2, 0, 0],
  ["face", "baraq-diadem", "Baraq Diadem", 10, 2, 5, 1, 0, 0],
  ["face", "elf-ears", "Elf Ears", 10, 1, 0, 1.5, 0, 0],
  ["face", "windy-elf-ears", "Windy Elf Ears", 10, 1.5, 5, 2.5, 0, 2],
  ["face", "bejewelled-earring", "Bejewelled Earring", 7, 1, 0, 2, 2, 4],
  ["face", "min-starrk-mask", "Min Starrk Mask", 15, 2, 0, 0, 0, 0],
  ["neck", "cursed-hood", "Cursed Hood", 10, 2.5, 10, 2, 0, 0],
  ["neck", "consortiums-profits", "Consortiums Profits", 7, 1.5, 0, 1, 2, 2],
  ["shoulder", "mre-pin", "MRE Pin", 6, 0, 15, 0, 1, 0],
  ["shoulder", "ivory-pauldron", "Ivory Pauldron", 0, 0, 0, 0, 1.5, 3],
  ["torso", "jailer-of-hell", "Jailer of Hell", 25, 5, 3, 2, 0, 0],
  ["torso", "dreadful-bone-armor", "Dreadful Bone Armor", 14, 8, 15, 3.5, 0, 0],
  ["torso", "black-sternritter-cloak", "Black Sternritter Cloak", 10, 10, 20, 0, 0, 0],
  ["torso", "duality-haori", "Duality Haori", 25, 1, 0, 0, 3, 5],
  ["torso", "crusaders-coat", "Crusaders Coat", 15, 5, 0, 1, 0, 0],
  ["torso", "yhwach-almighty-cloak", "Yhwach Almighty Cloak", 13, 2, 5, 3, 0, 0],
  ["torso", "sunset-haori", "Sunset Haori", 12, 3, 15, 3, 0, 0],
  ["torso", "shinigami-gordeau-cloak", "Shinigami Gordeau Cloak", 7, 1, 0, 1.2, 2.5, 0],
  ["back", "princes-cape", "Prince's Cape", 12, 0, 0, 1, 0, 0],
  ["back", "true-kalins-cape", "True Kalin's Cape", 10, 5.5, 0, 0.5, 0, 0],
  ["back", "soulfire-halo", "Soulfire Halo", 6, 4, 8, 2, 0, 0],
  ["back", "thunder-god-wheel", "Thunder God Wheel", 10, 2, 0, 0, 2, 4],
  ["waist", "monarchs-book", "Monarch's Book", 8, 2.5, 5, 2, 5, 5],
  ["waist", "strongest-tail", "Strongest Tail", 5, 3.5, 3, 0, 0, 0],
  ["waist", "sun-of-revival", "Sun of Revival", 3, 0, 0, 0, 1, 2],
  ["arm", "berserker-wraps", "Berserker Wraps", 3, 2, 0, 2, 2.5, 0],
  ["arm", "mugetsu-wrapping", "Mugetsu Wrapping", 0, 0, 0, 0, 0, 5],
  ["arm", "bararaq-extremity", "Bararaq Extremity", 10, 1, 10, 0, 1, 0],
  ["leg", "shinigami-raid-suit-legs", "Shinigami Raid Suit (Legs)", 10, 0, 5, 0, 0, 0],
  ["leg", "tiger-kings-pants", "Tiger King's Pants", 1, 2.5, 5, 1, 0, 0],
  ["emblem", "shinsei", "Shinsei", 8, 2.5, 0, 2, 5, 5],
  ["emblem", "frisky", "Frisky", 7, 0, 0, 2, 0, 0],
  ["face", "dreadful-bone-mask", "Dreadful Bone Mask", 8, 4, 2.5, 1.5, 0, 0],
  ["emblem", "starrk-pelt", "Starrk Pelt", 8, 0, 5, 1.5, 0, 0],
  ["torso", "mark-of-the-dead-body", "Mark of the Dead (Body)", 15, 5.5, 0, 3.5, 1, 2],
  ["arm", "siphons-ticker", "Siphon's Ticker", 10, 1, 15, 0, 1, 0],
].map(([slot, id, name, hp, posture, reiatsu, defense, meterGain, reducedMeterDrain]) => ({
  slot,
  id,
  name,
  bonuses: { hp, posture, reiatsu, defense, meterGain, reducedMeterDrain, modeDuration: 0, specialDuration: 0 },
}));

const initialAccessoryState = Object.fromEntries(accessorySlots.map((slot) => [slot, ""]));
const initialOwnedAccessoryState = Object.fromEntries(accessories.map((accessory) => [accessory.id, true]));
const accessoryOptimizeTargets = [
  ["effectiveHealth", "Effective Health"],
  ["hp", "HP"],
  ["posture", "Posture"],
  ["reiatsu", "Reiatsu"],
  ["defense", "Defense"],
  ["regenPerSecond", "Regen / Sec"],
  ["meterGain", "Meter Gain"],
  ["reducedMeterDrain", "Reduced Meter Drain"],
  ["modeDuration", "Mode Duration"],
  ["specialDuration", "Special Duration"],
];

const state = {
  race: null,
  clan: null,
  metaRace: "",
  clanSort: "default",
  accessories: { ...initialAccessoryState },
  ownedAccessories: { ...initialOwnedAccessoryState },
  ownershipOpenSlots: {},
  accessoryOptimizeTarget: "effectiveHealth",
  hollowVariant: "base",
  quincyDefenseMode: "blut",
  shinigamiDefenseVariant: false,
  includeRegenInEhp: false,
};

const elements = {
  controlGroups: document.getElementById("control-groups"),
  statGrid: document.getElementById("stat-grid"),
  summary: document.getElementById("selected-summary"),
  accessorySummary: document.getElementById("accessory-summary"),
  raceSelect: document.getElementById("race-select"),
  metaRaceSelect: document.getElementById("meta-race-select"),
  includeRegenEhp: document.getElementById("include-regen-ehp"),
  shareButton: document.getElementById("share-build"),
  resetButton: document.getElementById("reset-build"),
  optionCardTemplate: document.getElementById("option-card-template"),
  ownershipRowTemplate: document.getElementById("ownership-row-template"),
};

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getRace() {
  return races.find((race) => race.id === state.race) ?? null;
}

function getClanPool() {
  const pool = state.race ? clans.filter((clan) => clan.race === state.race) : [];
  if (state.clanSort === "default") return pool;
  return [...pool].sort((left, right) => {
    const difference = (right.bonuses[state.clanSort] ?? 0) - (left.bonuses[state.clanSort] ?? 0);
    if (difference !== 0) return difference;
    return left.name.localeCompare(right.name);
  });
}

function getClan() {
  return clans.find((clan) => clan.id === state.clan && clan.race === state.race) ?? null;
}

function getAccessoryOptions(slot) {
  return accessories.filter((accessory) => accessory.slot === slot);
}

function isAccessoryOwned(accessoryId) {
  return state.ownedAccessories[accessoryId] !== false;
}

function getOwnedAccessoryOptions(slot) {
  return getAccessoryOptions(slot).filter((accessory) => isAccessoryOwned(accessory.id));
}

function getSelectedAccessories(accessoryState = state.accessories) {
  return accessorySlots
    .map((slot) => accessories.find((accessory) => accessory.id === accessoryState[slot]))
    .filter(Boolean);
}

function specialLabelForRace(raceId) {
  if (raceId === "shinigami") return "Vizard Duration";
  if (raceId === "quincy") return "Letz Duration";
  return "Special Duration";
}

function sumBonuses(items) {
  const totals = {
    hp: 0,
    posture: 0,
    reiatsu: 0,
    defense: 0,
    regenPerSecond: 0,
    meterGain: 0,
    reducedMeterDrain: 0,
    modeDuration: 0,
    specialDuration: 0,
  };

  items.forEach((item) => {
    Object.keys(totals).forEach((key) => {
      totals[key] += item.bonuses[key] ?? 0;
    });
  });

  return totals;
}

function getRaceBuffBonuses() {
  const bonuses = {
    hp: 0,
    posture: 0,
    reiatsu: 0,
    defense: 0,
    regenPerSecond: 0,
    meterGain: 0,
    reducedMeterDrain: 0,
    modeDuration: 0,
    specialDuration: 0,
  };

  const clan = getClan();

  if (state.race === "hollow") {
    if (state.hollowVariant === "base" || state.hollowVariant === "ancient-vasto") bonuses.defense += 8;
    if (state.hollowVariant === "hierro") bonuses.defense += 15;
    if (state.hollowVariant === "ancient-vasto") {
      bonuses.regenPerSecond += 0.7;
    }
    if (clan?.id === "louisenbairn") {
      bonuses.defense += 2.5;
    }
  }

  if (state.race === "quincy") {
    if (state.quincyDefenseMode === "blut") bonuses.defense += 15;
    if (state.quincyDefenseMode === "blut-variant") bonuses.defense += 20;
    if (state.quincyDefenseMode === "boost-variant") bonuses.defense += 23.5;
  }

  if (state.race === "shinigami" && state.shinigamiDefenseVariant) {
    bonuses.defense += 5;
  }

  return bonuses;
}

function calcStats(accessoryState = state.accessories) {
  const clan = getClan();
  const selectedAccessories = getSelectedAccessories(accessoryState);
  const clanBonuses = clan?.bonuses ?? {
    hp: 0,
    posture: 0,
    reiatsu: 0,
    defense: 0,
    meterGain: 0,
      reducedMeterDrain: 0,
      modeDuration: 0,
      specialDuration: 0,
  };
  const accessoryBonuses = sumBonuses(selectedAccessories);
  const raceBuffBonuses = getRaceBuffBonuses();
  const nonAccessoryDefenseBonus = (clanBonuses.defense ?? 0) + (raceBuffBonuses.defense ?? 0);
  const accessoryDefenseBonus = accessoryBonuses.defense ?? 0;
  const accessoryDefenseUsed = Math.min(accessoryDefenseBonus, 23);

  const totalBonus = Object.fromEntries(
    Object.keys(baseStats).map((key) => [
      key,
      (clanBonuses[key] ?? 0) + (accessoryBonuses[key] ?? 0) + (raceBuffBonuses[key] ?? 0),
    ])
  );

  const hp = baseStats.hp + totalBonus.hp;
  const defense = baseStats.defense + totalBonus.defense;
  const cappedDefense = baseStats.defense + accessoryDefenseUsed + nonAccessoryDefenseBonus;
  const regenPerSecond = baseStats.regenPerSecond + totalBonus.regenPerSecond;
  const regenContribution = state.includeRegenInEhp ? regenPerSecond * 60 : 0;
  const effectiveHealth = Math.round((hp + regenContribution) / Math.max(0.01, 1 - cappedDefense / 100));

  return {
    hp,
    effectiveHealth,
    posture: baseStats.posture + totalBonus.posture,
    reiatsu: baseStats.reiatsu + totalBonus.reiatsu,
    defense,
    cappedDefense,
    regenPerSecond,
    meterGain: baseStats.meterGain + totalBonus.meterGain,
    reducedMeterDrain: baseStats.reducedMeterDrain + totalBonus.reducedMeterDrain,
    modeDuration: baseStats.modeDuration + totalBonus.modeDuration,
    specialDuration: baseStats.specialDuration + totalBonus.specialDuration,
    hpBonus: totalBonus.hp,
    effectiveHealthBonus: effectiveHealth - baseStats.effectiveHealth,
    postureBonus: totalBonus.posture,
    reiatsuBonus: totalBonus.reiatsu,
    defenseBonus: totalBonus.defense,
    accessoryDefenseBonus,
    accessoryDefenseUsed,
    nonAccessoryDefenseBonus,
    regenPerSecondBonus: totalBonus.regenPerSecond,
    meterGainBonus: totalBonus.meterGain,
    reducedMeterDrainBonus: totalBonus.reducedMeterDrain,
    modeDurationBonus: totalBonus.modeDuration,
    specialDurationBonus: totalBonus.specialDuration,
    specialLabel: clan?.specialLabel || specialLabelForRace(state.race),
    regenIncludedInEhp: state.includeRegenInEhp,
  };
}

function getBuffStatesForRace(raceId) {
  if (raceId === "hollow") {
    return [
      { hollowVariant: "proficiency", quincyDefenseMode: "blut", shinigamiDefenseVariant: false },
      { hollowVariant: "base", quincyDefenseMode: "blut", shinigamiDefenseVariant: false },
      { hollowVariant: "hierro", quincyDefenseMode: "blut", shinigamiDefenseVariant: false },
      { hollowVariant: "ancient-vasto", quincyDefenseMode: "blut", shinigamiDefenseVariant: false },
    ];
  }

  if (raceId === "quincy") {
    return [
      { hollowVariant: "base", quincyDefenseMode: "blut", shinigamiDefenseVariant: false },
      { hollowVariant: "base", quincyDefenseMode: "blut-variant", shinigamiDefenseVariant: false },
      { hollowVariant: "base", quincyDefenseMode: "boost-variant", shinigamiDefenseVariant: false },
    ];
  }

  if (raceId === "shinigami") {
    return [
      { hollowVariant: "base", quincyDefenseMode: "blut", shinigamiDefenseVariant: false },
      { hollowVariant: "base", quincyDefenseMode: "blut", shinigamiDefenseVariant: true },
    ];
  }

  return [
    { hollowVariant: "base", quincyDefenseMode: "blut", shinigamiDefenseVariant: false },
  ];
}

function isBetterStatLine(candidate, best) {
  if (!best) return true;
  if (candidate.effectiveHealth !== best.effectiveHealth) return candidate.effectiveHealth > best.effectiveHealth;
  if (candidate.hp !== best.hp) return candidate.hp > best.hp;
  return candidate.defense > best.defense;
}

function compareAccessoryOptimizationStats(candidate, best, target) {
  if (!best) return true;
  if ((candidate[target] ?? 0) !== (best[target] ?? 0)) {
    return (candidate[target] ?? 0) > (best[target] ?? 0);
  }
  return isBetterStatLine(candidate, best);
}

function makeEmptyAccessoryBonusTotals() {
  return {
    hp: 0,
    posture: 0,
    reiatsu: 0,
    defense: 0,
    regenPerSecond: 0,
    meterGain: 0,
    reducedMeterDrain: 0,
    modeDuration: 0,
    specialDuration: 0,
  };
}

function addAccessoryBonusTotals(left, right) {
  return {
    hp: left.hp + (right.hp ?? 0),
    posture: left.posture + (right.posture ?? 0),
    reiatsu: left.reiatsu + (right.reiatsu ?? 0),
    defense: left.defense + (right.defense ?? 0),
    regenPerSecond: left.regenPerSecond + (right.regenPerSecond ?? 0),
    meterGain: left.meterGain + (right.meterGain ?? 0),
    reducedMeterDrain: left.reducedMeterDrain + (right.reducedMeterDrain ?? 0),
    modeDuration: left.modeDuration + (right.modeDuration ?? 0),
    specialDuration: left.specialDuration + (right.specialDuration ?? 0),
  };
}

function buildStatsFromAccessoryBonuses(baseBuildStats, accessoryBonuses) {
  const accessoryDefenseBonus = accessoryBonuses.defense ?? 0;
  const accessoryDefenseUsed = Math.min(accessoryDefenseBonus, 25);
  const cappedDefense = baseBuildStats.nonAccessoryDefenseBonus + accessoryDefenseUsed;
  const regenPerSecond = baseBuildStats.regenPerSecond + (accessoryBonuses.regenPerSecond ?? 0);
  const regenContribution = state.includeRegenInEhp ? regenPerSecond * 60 : 0;
  const hp = baseBuildStats.hp + (accessoryBonuses.hp ?? 0);
  const effectiveHealth = Math.round((hp + regenContribution) / Math.max(0.01, 1 - cappedDefense / 100));

  return {
    hp,
    effectiveHealth,
    posture: baseBuildStats.posture + (accessoryBonuses.posture ?? 0),
    reiatsu: baseBuildStats.reiatsu + (accessoryBonuses.reiatsu ?? 0),
    defense: baseBuildStats.defense + accessoryDefenseBonus,
    cappedDefense,
    regenPerSecond,
    meterGain: baseBuildStats.meterGain + (accessoryBonuses.meterGain ?? 0),
    reducedMeterDrain: baseBuildStats.reducedMeterDrain + (accessoryBonuses.reducedMeterDrain ?? 0),
    modeDuration: baseBuildStats.modeDuration + (accessoryBonuses.modeDuration ?? 0),
    specialDuration: baseBuildStats.specialDuration + (accessoryBonuses.specialDuration ?? 0),
    hpBonus: baseBuildStats.hpBonus + (accessoryBonuses.hp ?? 0),
    effectiveHealthBonus: effectiveHealth - baseStats.effectiveHealth,
    postureBonus: baseBuildStats.postureBonus + (accessoryBonuses.posture ?? 0),
    reiatsuBonus: baseBuildStats.reiatsuBonus + (accessoryBonuses.reiatsu ?? 0),
    defenseBonus: baseBuildStats.nonAccessoryDefenseBonus + accessoryDefenseBonus,
    accessoryDefenseBonus,
    accessoryDefenseUsed,
    nonAccessoryDefenseBonus: baseBuildStats.nonAccessoryDefenseBonus,
    regenPerSecondBonus: baseBuildStats.regenPerSecondBonus + (accessoryBonuses.regenPerSecond ?? 0),
    meterGainBonus: baseBuildStats.meterGainBonus + (accessoryBonuses.meterGain ?? 0),
    reducedMeterDrainBonus: baseBuildStats.reducedMeterDrainBonus + (accessoryBonuses.reducedMeterDrain ?? 0),
    modeDurationBonus: baseBuildStats.modeDurationBonus + (accessoryBonuses.modeDuration ?? 0),
    specialDurationBonus: baseBuildStats.specialDurationBonus + (accessoryBonuses.specialDuration ?? 0),
    specialLabel: baseBuildStats.specialLabel,
    regenIncludedInEhp: state.includeRegenInEhp,
  };
}

function getOptimizerScoreTuple(accessory, target) {
  const bonuses = accessory?.bonuses ?? makeEmptyAccessoryBonusTotals();
  return [
    bonuses[target] ?? 0,
    bonuses.hp ?? 0,
    bonuses.defense ?? 0,
    bonuses.reiatsu ?? 0,
    bonuses.posture ?? 0,
    bonuses.meterGain ?? 0,
    bonuses.reducedMeterDrain ?? 0,
  ];
}

function isTupleBetter(left, right) {
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return left[index] > right[index];
  }
  return false;
}

function getBestAccessoryStateForAdditiveTarget(target, ownedOptionsBySlot) {
  const bestState = { ...initialAccessoryState };

  accessorySlots.forEach((slot) => {
    const options = [null, ...ownedOptionsBySlot.get(slot)];
    let bestOption = null;
    let bestTuple = getOptimizerScoreTuple(null, target);

    options.forEach((option) => {
      const tuple = getOptimizerScoreTuple(option, target);
      if (isTupleBetter(tuple, bestTuple)) {
        bestTuple = tuple;
        bestOption = option;
      }
    });

    bestState[slot] = bestOption?.id ?? "";
  });

  return bestState;
}

function getBestAccessoryStateForEffectiveHealth(baseBuildStats, ownedOptionsBySlot) {
  let frontier = new Map([[0, { bonuses: makeEmptyAccessoryBonusTotals(), state: { ...initialAccessoryState } }]]);

  accessorySlots.forEach((slot) => {
    const nextFrontier = new Map();
    const options = [null, ...ownedOptionsBySlot.get(slot)];

    options.forEach((option) => {
      frontier.forEach((entry) => {
        const bonuses = option ? addAccessoryBonusTotals(entry.bonuses, option.bonuses) : { ...entry.bonuses };
        const defenseKey = Math.round(Math.min(bonuses.defense, 25) * 10);
        const candidateState = { ...entry.state, [slot]: option?.id ?? "" };
        const candidateStats = buildStatsFromAccessoryBonuses(baseBuildStats, bonuses);
        const existing = nextFrontier.get(defenseKey);

        if (!existing) {
          nextFrontier.set(defenseKey, { bonuses, state: candidateState, stats: candidateStats });
          return;
        }

        if (compareAccessoryOptimizationStats(candidateStats, existing.stats, "effectiveHealth")) {
          nextFrontier.set(defenseKey, { bonuses, state: candidateState, stats: candidateStats });
        }
      });
    });

    frontier = nextFrontier;
  });

  let best = null;
  frontier.forEach((entry) => {
    if (!best || compareAccessoryOptimizationStats(entry.stats, best.stats, "effectiveHealth")) {
      best = entry;
    }
  });

  return best?.state ?? { ...initialAccessoryState };
}

function getBestAccessoryStateForCurrentBuild(target = state.accessoryOptimizeTarget) {
  const baseBuildStats = calcStats(initialAccessoryState);
  const ownedOptionsBySlot = new Map(accessorySlots.map((slot) => [slot, getOwnedAccessoryOptions(slot)]));

  if (target === "effectiveHealth") {
    return getBestAccessoryStateForEffectiveHealth(baseBuildStats, ownedOptionsBySlot);
  }

  return getBestAccessoryStateForAdditiveTarget(target, ownedOptionsBySlot);
}

function equipBestAccessories() {
  state.accessories = getBestAccessoryStateForCurrentBuild(state.accessoryOptimizeTarget);
  syncUrl();
  rerender();
}

function getBestMetaClanBuildForRace(raceId) {
  const clanPool = clans.filter((clan) => clan.race === raceId);
  let bestResult = null;

  clanPool.forEach((clan) => {
    state.race = raceId;
    state.clan = clan.id;
    state.accessories = { ...initialAccessoryState };

    const bestBuffState = getBestBuffStateForCurrentRaceAndClan(raceId);
    state.hollowVariant = bestBuffState.hollowVariant;
    state.quincyDefenseMode = bestBuffState.quincyDefenseMode;
    state.shinigamiDefenseVariant = bestBuffState.shinigamiDefenseVariant;

    const bestAccessories = getBestAccessoryStateForCurrentBuild("effectiveHealth");
    const stats = calcStats(bestAccessories);
    const candidate = {
      clan,
      buffState: bestBuffState,
      accessories: bestAccessories,
      stats,
    };

    if (!bestResult || compareAccessoryOptimizationStats(candidate.stats, bestResult.stats, "effectiveHealth")) {
      bestResult = candidate;
    }
  });

  return bestResult;
}

function getBestBuffStateForCurrentRaceAndClan(raceId) {
  const buffCandidates = getBuffStatesForRace(raceId);
  let bestBuffState = buffCandidates[0];
  let bestStats = null;

  buffCandidates.forEach((buffState) => {
    state.hollowVariant = buffState.hollowVariant;
    state.quincyDefenseMode = buffState.quincyDefenseMode;
    state.shinigamiDefenseVariant = buffState.shinigamiDefenseVariant;
    const candidateStats = calcStats(initialAccessoryState);
    if (isBetterStatLine(candidateStats, bestStats)) {
      bestStats = candidateStats;
      bestBuffState = buffState;
    }
  });

  return bestBuffState;
}

function applyBestMetaBuild(raceId) {
  const previousState = {
    race: state.race,
    clan: state.clan,
    accessories: { ...state.accessories },
    hollowVariant: state.hollowVariant,
    quincyDefenseMode: state.quincyDefenseMode,
    shinigamiDefenseVariant: state.shinigamiDefenseVariant,
  };
  const bestBuild = getBestMetaClanBuildForRace(raceId);
  if (!bestBuild) {
    state.race = previousState.race;
    state.clan = previousState.clan;
    state.accessories = previousState.accessories;
    state.hollowVariant = previousState.hollowVariant;
    state.quincyDefenseMode = previousState.quincyDefenseMode;
    state.shinigamiDefenseVariant = previousState.shinigamiDefenseVariant;
    return;
  }

  state.metaRace = raceId;
  state.race = raceId;
  state.clan = bestBuild.clan.id;
  state.hollowVariant = bestBuild.buffState.hollowVariant;
  state.quincyDefenseMode = bestBuild.buffState.quincyDefenseMode;
  state.shinigamiDefenseVariant = bestBuild.buffState.shinigamiDefenseVariant;
  state.accessories = { ...bestBuild.accessories };
  syncUrl();
  rerender();
}

function getBestFullBuildForTarget(target) {
  const previousState = {
    race: state.race,
    clan: state.clan,
    accessories: { ...state.accessories },
    hollowVariant: state.hollowVariant,
    quincyDefenseMode: state.quincyDefenseMode,
    shinigamiDefenseVariant: state.shinigamiDefenseVariant,
  };
  let bestResult = null;

  races.forEach((race) => {
    const clanPool = clans.filter((clan) => clan.race === race.id);

    clanPool.forEach((clan) => {
      state.race = race.id;
      state.clan = clan.id;
      state.accessories = { ...initialAccessoryState };

      getBuffStatesForRace(race.id).forEach((buffState) => {
        state.hollowVariant = buffState.hollowVariant;
        state.quincyDefenseMode = buffState.quincyDefenseMode;
        state.shinigamiDefenseVariant = buffState.shinigamiDefenseVariant;

        const bestAccessories = getBestAccessoryStateForCurrentBuild(target);
        const stats = calcStats(bestAccessories);
        const candidate = {
          race: race.id,
          clan: clan.id,
          accessories: bestAccessories,
          hollowVariant: buffState.hollowVariant,
          quincyDefenseMode: buffState.quincyDefenseMode,
          shinigamiDefenseVariant: buffState.shinigamiDefenseVariant,
          stats,
        };

        if (!bestResult || compareAccessoryOptimizationStats(candidate.stats, bestResult.stats, target)) {
          bestResult = candidate;
        }
      });
    });
  });

  state.race = previousState.race;
  state.clan = previousState.clan;
  state.accessories = previousState.accessories;
  state.hollowVariant = previousState.hollowVariant;
  state.quincyDefenseMode = previousState.quincyDefenseMode;
  state.shinigamiDefenseVariant = previousState.shinigamiDefenseVariant;

  return bestResult;
}

function applyBestBuildForTarget(target) {
  const bestBuild = getBestFullBuildForTarget(target);
  if (!bestBuild) return;

  state.metaRace = "";
  state.accessoryOptimizeTarget = target;
  state.race = bestBuild.race;
  state.clan = bestBuild.clan;
  state.accessories = { ...bestBuild.accessories };
  state.hollowVariant = bestBuild.hollowVariant;
  state.quincyDefenseMode = bestBuild.quincyDefenseMode;
  state.shinigamiDefenseVariant = bestBuild.shinigamiDefenseVariant;
  syncUrl();
  rerender();
}

function renderControls() {
  elements.controlGroups.innerHTML = "";
  renderRaceSelect();
  renderGroup("Clan", state.race ? `${getClanPool().length} clans` : "Select race first", getClanPool(), "clan", !state.race);
  renderRaceBuffControls();
  renderAccessoryControls();
}

function renderRaceSelect() {
  elements.raceSelect.innerHTML = '<option value="">Select race</option>';
  races.forEach((race) => {
    const option = document.createElement("option");
    option.value = race.id;
    option.textContent = race.name;
    if (state.race === race.id) option.selected = true;
    elements.raceSelect.appendChild(option);
  });
}

function renderGroup(title, hint, options, key, locked = false) {
  const section = document.createElement("section");
  section.className = "control-group";

  const header = document.createElement("div");
  header.className = "control-group-header";
  const titleRow = document.createElement("div");
  titleRow.className = "control-group-title";
  titleRow.innerHTML = `<h3>${title}</h3>`;

  if (key === "clan") {
    const sortControl = document.createElement("label");
    sortControl.className = "inline-control";
    sortControl.innerHTML = `
      <span>Sort</span>
      <select id="clan-sort-inline" class="sort-select">
        <option value="default">Default</option>
        <option value="hp">Highest HP</option>
        <option value="posture">Highest Posture</option>
        <option value="reiatsu">Highest Reiatsu</option>
        <option value="modeDuration">Highest Mode Duration</option>
        <option value="specialDuration">Highest Special Duration</option>
      </select>
    `;
    sortControl.querySelector("select").value = state.clanSort;
    sortControl.querySelector("select").addEventListener("change", (event) => {
      state.metaRace = "";
      state.clanSort = event.target.value;
      syncUrl();
      rerender();
    });
    titleRow.appendChild(sortControl);
  }

  header.append(titleRow);
  const hintText = document.createElement("span");
  hintText.textContent = hint;
  header.appendChild(hintText);

  const grid = document.createElement("div");
  grid.className = "option-grid";
  if (key === "clan" && state.clan) {
    grid.classList.add("option-grid-compact");
  }

  if (locked) {
    const empty = document.createElement("article");
    empty.className = "selected-item";
    empty.innerHTML = "<strong>Clan Pool Locked</strong><span>Select a race.</span>";
    grid.appendChild(empty);
  }

  const visibleOptions =
    key === "clan" && state.clan
      ? options.filter((option) => option.id === state.clan)
      : options;

  visibleOptions.forEach((option) => {
    const card = elements.optionCardTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector(".option-topline").textContent = `${option.rarity} | ${option.dropRate}`;
    card.querySelector(".option-name").textContent = option.name;
    card.querySelector(".option-description").textContent = `${option.passiveName}: ${option.passive}`;
    card.querySelector(".option-bonuses").textContent = formatBonuses(option.bonuses, option.specialLabel);
    if (state[key] === option.id) card.classList.add("is-selected");
    card.addEventListener("click", () => selectOption(key, option.id));
    grid.appendChild(card);
  });

  section.append(header, grid);
  elements.controlGroups.appendChild(section);
}

function renderAccessoryControls() {
  const section = document.createElement("section");
  section.className = "control-group";

  const header = document.createElement("div");
  header.className = "control-group-header";
  const titleRow = document.createElement("div");
  titleRow.className = "control-group-title";
  titleRow.innerHTML = "<h3>Accessories</h3>";

  const actions = document.createElement("div");
  actions.className = "accessory-actions";

  const optimizerSelect = document.createElement("select");
  optimizerSelect.className = "sort-select optimizer-select";
  accessoryOptimizeTargets.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `Best ${label}`;
    if (state.accessoryOptimizeTarget === value) option.selected = true;
    optimizerSelect.appendChild(option);
  });
  optimizerSelect.addEventListener("change", (event) => {
    state.accessoryOptimizeTarget = event.target.value;
    syncUrl();
    rerender();
  });

  const equipBestButton = document.createElement("button");
  equipBestButton.type = "button";
  equipBestButton.className = "button button-secondary button-compact";
  equipBestButton.textContent = "Equip Best";
  equipBestButton.addEventListener("click", equipBestAccessories);

  actions.append(optimizerSelect, equipBestButton);
  titleRow.appendChild(actions);

  header.appendChild(titleRow);
  const hintText = document.createElement("span");
  hintText.textContent = "One per slot. Equip Best only uses accessories marked as owned.";
  header.appendChild(hintText);

  const grid = document.createElement("div");
  grid.className = "accessory-grid";

  accessorySlots.forEach((slot) => {
    const field = document.createElement("label");
    field.className = "field-control";

    const label = document.createElement("span");
    label.textContent = titleCase(slot);

    const select = document.createElement("select");
    select.className = "field-select";
    select.dataset.slot = slot;
    select.innerHTML = `<option value="">None</option>`;

    getAccessoryOptions(slot).forEach((accessory) => {
      const option = document.createElement("option");
      option.value = accessory.id;
      option.textContent = `${accessory.name}${isAccessoryOwned(accessory.id) ? "" : " (Not Owned)"}`;
      if (state.accessories[slot] === accessory.id) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener("change", (event) => {
      state.metaRace = "";
      state.accessories[slot] = event.target.value;
      syncUrl();
      rerender();
    });

    field.append(label, select);
    grid.appendChild(field);
  });

  const ownershipGroup = document.createElement("div");
  ownershipGroup.className = "ownership-groups";

  accessorySlots.forEach((slot) => {
    const details = document.createElement("details");
    details.className = "ownership-slot";
    details.open = state.ownershipOpenSlots[slot] ?? false;
    details.addEventListener("toggle", () => {
      state.ownershipOpenSlots[slot] = details.open;
    });

    const ownedCount = getOwnedAccessoryOptions(slot).length;
    const totalCount = getAccessoryOptions(slot).length;
    details.innerHTML = `<summary><strong>Owned ${titleCase(slot)}</strong><span>${ownedCount}/${totalCount} owned</span></summary>`;

    const list = document.createElement("div");
    list.className = "ownership-list";

    getAccessoryOptions(slot).forEach((accessory) => {
      const row = elements.ownershipRowTemplate.content.firstElementChild.cloneNode(true);
      const checkbox = row.querySelector("input");
      const name = row.querySelector(".ownership-name");
      checkbox.checked = isAccessoryOwned(accessory.id);
      checkbox.addEventListener("change", (event) => {
        state.ownedAccessories[accessory.id] = event.target.checked;
        if (!event.target.checked && state.accessories[slot] === accessory.id) {
          state.accessories[slot] = "";
        }
        syncUrl();
        rerender();
      });
      name.textContent = accessory.name;
      list.appendChild(row);
    });

    details.appendChild(list);
    ownershipGroup.appendChild(details);
  });

  section.append(header, grid, ownershipGroup);
  elements.controlGroups.appendChild(section);
}

function renderRaceBuffControls() {
  if (!state.race) return;

  const section = document.createElement("section");
  section.className = "control-group";

  const header = document.createElement("div");
  header.className = "control-group-header";
  header.innerHTML = "<h3>Buffs</h3><span>Race-based estimates</span>";

  const grid = document.createElement("div");
  grid.className = "accessory-grid";

  if (state.race === "hollow") {
    const field = document.createElement("label");
    field.className = "field-control";
    field.innerHTML = `<span>Arrancar Variant</span>
      <select class="field-select" id="hollow-variant-select">
        <option value="proficiency">Proficiency (No Hierro)</option>
        <option value="base">Base Hierro (8% Defense)</option>
        <option value="hierro">Hierro Variant (+7%, 15% Total)</option>
        <option value="ancient-vasto">Ancient Vasto (8% Defense, 0.7 Regen)</option>
      </select>`;
    field.querySelector("select").value = state.hollowVariant;
    grid.appendChild(field);
  }

  if (state.race === "quincy") {
    const field = document.createElement("label");
    field.className = "field-control";
    field.innerHTML = `<span>Quincy Defense Mode</span>
      <select class="field-select" id="quincy-defense-mode-select">
        <option value="blut">Blut (15% Defense)</option>
        <option value="blut-variant">Blut Variant (20% Total)</option>
        <option value="boost-variant">Boost Variant (23.5% Total)</option>
      </select>`;
    field.querySelector("select").value = state.quincyDefenseMode;
    grid.appendChild(field);
  }

  if (state.race === "shinigami") {
    const defenseVariant = document.createElement("label");
    defenseVariant.className = "toggle-control";
    defenseVariant.innerHTML = `<input type="checkbox" id="shinigami-defense-variant" ${state.shinigamiDefenseVariant ? "checked" : ""} /><span>Vizard Defense Variant (+5% Defense)</span>`;
    grid.appendChild(defenseVariant);
  }

  section.append(header, grid);
  elements.controlGroups.appendChild(section);
}

function formatBonuses(bonuses, specialLabel = "Special Duration") {
  const parts = [];
  if (bonuses.hp) parts.push(`+${bonuses.hp} HP`);
  if (bonuses.posture) parts.push(`+${bonuses.posture} Posture`);
  if (bonuses.reiatsu) parts.push(`+${bonuses.reiatsu} Reiatsu`);
  if (bonuses.defense) parts.push(`+${bonuses.defense}% Defense`);
  if (bonuses.regenPerSecond) parts.push(`+${bonuses.regenPerSecond}/s Regen`);
  if (bonuses.meterGain) parts.push(`+${bonuses.meterGain}% Meter`);
  if (bonuses.reducedMeterDrain) parts.push(`+${bonuses.reducedMeterDrain}% Drain`);
  if (bonuses.modeDuration) parts.push(`+${bonuses.modeDuration}% Mode`);
  if (bonuses.specialDuration) parts.push(`+${bonuses.specialDuration}% ${specialLabel.replace(" Duration", "")}`);
  return parts.join(" | ") || "No bonus";
}

function selectOption(key, id) {
  state.metaRace = "";
  if (key === "race") {
    state.race = state.race === id ? null : id;
    if (!getClanPool().some((clan) => clan.id === state.clan)) state.clan = null;
  } else {
    state.clan = state.clan === id ? null : id;
  }
  syncUrl();
  rerender();
}

function renderStats() {
  const stats = calcStats();
  elements.statGrid.innerHTML = "";

  statDefinitions.forEach((definition) => {
    const label = definition.key === "specialDuration" ? stats.specialLabel : definition.label;
    const value = stats[definition.key];
    const bonus = stats[`${definition.key}Bonus`];
    if (value <= 0) return;
    const baseValue = baseStats[definition.key];
    const suffix = definition.suffix ?? "";
    const card = document.createElement("article");
    card.className = "stat-card";
    const meta =
      definition.key === "effectiveHealth"
        ? `Accessory defense used: ${stats.accessoryDefenseUsed}% of ${stats.accessoryDefenseBonus}% | Total defense used: ${stats.cappedDefense}%${stats.regenIncludedInEhp ? " | Regen included" : " | Regen ignored"} | Bonus +${bonus}${suffix}`
        : definition.key === "defense"
          ? `Accessory defense: ${stats.accessoryDefenseBonus}% (${stats.accessoryDefenseUsed}% used) | Other defense: ${stats.nonAccessoryDefenseBonus}% | EHP uses ${stats.cappedDefense}%`
          : `Base ${baseValue}${suffix} | Bonus +${bonus}${suffix}`;
    card.innerHTML = `<span class="stat-label">${label}</span><div class="stat-value-row"><span class="stat-value">${value}${suffix}</span></div><div class="stat-meta">${meta}</div>`;
    const valueRow = card.querySelector(".stat-value-row");
    const optimizeButton = document.createElement("button");
    optimizeButton.type = "button";
    optimizeButton.className = "button button-secondary button-compact stat-action";
    optimizeButton.textContent = "Equip Best";
    optimizeButton.addEventListener("click", () => applyBestBuildForTarget(definition.key));
    valueRow.appendChild(optimizeButton);
    elements.statGrid.appendChild(card);
  });
}

function renderSummary() {
  const race = getRace();
  const clan = getClan();
  const selectedAccessories = getSelectedAccessories();
  const raceBuffs = getRaceBuffBonuses();
  const ownedCount = Object.values(state.ownedAccessories).filter(Boolean).length;
  const optimizeLabel = accessoryOptimizeTargets.find(([value]) => value === state.accessoryOptimizeTarget)?.[1] ?? "Effective Health";
  elements.summary.innerHTML = "";
  elements.accessorySummary.innerHTML = "";

  addSummaryCard("Race", race ? race.name : "None");
  addSummaryCard("Clan", clan ? `${clan.name} (${clan.rarity} | ${clan.dropRate})` : "None");
  addSummaryCard("Clan Passive", clan ? `${clan.passiveName}: ${clan.passive}` : "None");

  if (clan) {
    addSummaryCard("Clan Bonuses", formatBonuses(clan.bonuses, clan.specialLabel || specialLabelForRace(state.race)));
  }

  if (state.race && formatBonuses(raceBuffs) !== "No bonus") {
    addSummaryCard("Race Buffs", formatBonuses(raceBuffs, specialLabelForRace(state.race)));
  }

  addSummaryCard("Accessory Optimizer", `Targeting ${optimizeLabel}. Owned pool: ${ownedCount}/${accessories.length} accessories.`);

  if (selectedAccessories.length > 0) {
    const stats = calcStats();
    addSummaryCard(
      "Defense Rule",
      `Accessories give ${stats.accessoryDefenseBonus}% defense, but only ${stats.accessoryDefenseUsed}% counts toward EHP. Race and variant defense add on top for ${stats.cappedDefense}% total EHP defense.`
    );
  }

  if (selectedAccessories.length > 0) {
    selectedAccessories.forEach((accessory) => {
      addAccessorySummaryCard(`${titleCase(accessory.slot)}`, `${accessory.name} | ${formatBonuses(accessory.bonuses)}`);
    });
  } else {
    addAccessorySummaryCard("Accessories", "None");
  }
}

function addSummaryCard(title, text) {
  const card = document.createElement("article");
  card.className = "selected-item";
  card.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
  elements.summary.appendChild(card);
}

function addAccessorySummaryCard(title, text) {
  const card = document.createElement("article");
  card.className = "selected-item";
  card.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
  elements.accessorySummary.appendChild(card);
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.metaRace) params.set("meta", state.metaRace);
  if (state.race) params.set("race", state.race);
  if (state.clan) params.set("clan", state.clan);
  if (state.accessoryOptimizeTarget !== "effectiveHealth") params.set("optimize", state.accessoryOptimizeTarget);
  if (state.includeRegenInEhp) params.set("regenEhp", "1");
  if (state.clanSort !== "default") params.set("sort", state.clanSort);
  if (state.hollowVariant !== "base") params.set("hollowVariant", state.hollowVariant);
  if (state.quincyDefenseMode !== "blut") params.set("quincyDefenseMode", state.quincyDefenseMode);
  if (state.shinigamiDefenseVariant) params.set("shinigamiDefenseVariant", "1");
  const excluded = accessories.filter((accessory) => !isAccessoryOwned(accessory.id)).map((accessory) => accessory.id);
  if (excluded.length > 0) params.set("exclude", excluded.join(","));

  accessorySlots.forEach((slot) => {
    if (state.accessories[slot]) {
      params.set(slot, state.accessories[slot]);
    }
  });

  window.history.replaceState({}, "", `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`);
}

function loadStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const metaRace = params.get("meta");
  if (["shinigami", "hollow", "quincy", "fullbringer"].includes(metaRace)) {
    state.metaRace = metaRace;
  }
  state.includeRegenInEhp = params.get("regenEhp") === "1";
  const optimizeTarget = params.get("optimize");
  if (accessoryOptimizeTargets.some(([value]) => value === optimizeTarget)) {
    state.accessoryOptimizeTarget = optimizeTarget;
  }
  const race = params.get("race");
  if (races.some((entry) => entry.id === race)) state.race = race;

  const clan = params.get("clan");
  if (clans.some((entry) => entry.id === clan && entry.race === state.race)) state.clan = clan;

  const clanSort = params.get("sort");
  if (["default", "hp", "posture", "reiatsu", "modeDuration", "specialDuration"].includes(clanSort)) {
    state.clanSort = clanSort;
  }

  const hollowVariant = params.get("hollowVariant");
  if (["proficiency", "base", "hierro", "ancient-vasto"].includes(hollowVariant)) {
    state.hollowVariant = hollowVariant;
  }
  const quincyDefenseMode = params.get("quincyDefenseMode");
  if (["blut", "blut-variant", "boost-variant"].includes(quincyDefenseMode)) {
    state.quincyDefenseMode = quincyDefenseMode;
  }
  state.shinigamiDefenseVariant = params.get("shinigamiDefenseVariant") === "1";
  const excluded = new Set((params.get("exclude") ?? "").split(",").filter(Boolean));
  accessories.forEach((accessory) => {
    state.ownedAccessories[accessory.id] = !excluded.has(accessory.id);
  });

  accessorySlots.forEach((slot) => {
    const value = params.get(slot);
    if (getAccessoryOptions(slot).some((accessory) => accessory.id === value) && isAccessoryOwned(value)) {
      state.accessories[slot] = value;
    }
  });
}

function resetBuild() {
  state.race = null;
  state.clan = null;
  state.metaRace = "";
  state.clanSort = "default";
  state.accessories = { ...initialAccessoryState };
  state.ownedAccessories = { ...initialOwnedAccessoryState };
  state.accessoryOptimizeTarget = "effectiveHealth";
  state.hollowVariant = "base";
  state.quincyDefenseMode = "blut";
  state.shinigamiDefenseVariant = false;
  state.includeRegenInEhp = false;
  syncUrl();
  rerender();
}

async function copyShareLink() {
  syncUrl();
  try {
    await navigator.clipboard.writeText(window.location.href);
    elements.shareButton.textContent = "Link Copied";
  } catch {
    elements.shareButton.textContent = "Copy Failed";
  }
  window.setTimeout(() => {
    elements.shareButton.textContent = "Copy Share Link";
  }, 1600);
}

function rerender() {
  elements.raceSelect.value = state.race ?? "";
  elements.metaRaceSelect.value = state.metaRace ?? "";
  elements.includeRegenEhp.checked = state.includeRegenInEhp;
  renderControls();
  renderStats();
  renderSummary();
}

elements.resetButton.addEventListener("click", resetBuild);
elements.shareButton.addEventListener("click", copyShareLink);
elements.raceSelect.addEventListener("change", (event) => {
  state.metaRace = "";
  const nextRace = event.target.value || null;
  state.race = nextRace;
  if (!getClanPool().some((clan) => clan.id === state.clan)) state.clan = null;
  if (state.race !== "hollow") state.hollowVariant = "base";
  if (state.race !== "quincy") state.quincyDefenseMode = "blut";
  if (state.race !== "shinigami") state.shinigamiDefenseVariant = false;
  syncUrl();
  rerender();
});
elements.metaRaceSelect.addEventListener("change", (event) => {
  const raceId = event.target.value;
  if (!raceId) {
    state.metaRace = "";
    syncUrl();
    rerender();
    return;
  }
  applyBestMetaBuild(raceId);
});
elements.includeRegenEhp.addEventListener("change", (event) => {
  state.includeRegenInEhp = event.target.checked;
  syncUrl();
  rerender();
});
document.addEventListener("change", (event) => {
  if (event.target.id === "hollow-variant-select") {
    state.metaRace = "";
    state.hollowVariant = event.target.value;
  }
  if (event.target.id === "quincy-defense-mode-select") {
    state.metaRace = "";
    state.quincyDefenseMode = event.target.value;
  }
  if (event.target.id === "shinigami-defense-variant") {
    state.metaRace = "";
    state.shinigamiDefenseVariant = event.target.checked;
  }
  if (
    ["hollow-variant-select", "quincy-defense-mode-select", "shinigami-defense-variant"].includes(
      event.target.id
    )
  ) {
    syncUrl();
    rerender();
  }
});

loadStateFromUrl();
rerender();
