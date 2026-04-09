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
  ["face", "reinvent-diadem", "Reinvent Diadem", 10, 2, 10, 2.5, 4, 0],
  ["neck", "cursed-hood", "Cursed Hood", 10, 2.5, 10, 2, 0, 0],
  ["shoulder", "mre-pin", "MRE Pin", 6, 0, 15, 0, 1, 0],
  ["torso", "jailer-of-hell", "Jailer of Hell", 25, 5, 3, 2, 0, 0],
  ["back", "princes-cape", "Prince's Cape", 12, 0, 0, 1, 0, 0],
  ["waist", "monarchs-book", "Monarch's Book", 8, 2.5, 5, 2, 5, 5],
  ["arm", "berserker-wraps", "Berserker Wraps", 3, 2, 0, 2, 2.5, 0],
  ["leg", "shinigami-raid-suit-legs", "Shinigami Raid Suit (Legs)", 10, 0, 5, 0, 0, 0],
  ["emblem", "shinsei", "Shinsei", 8, 2.5, 0, 2, 5, 5],
  ["torso", "mark-of-the-dead-body", "Mark of the Dead (Body)", 15, 5.5, 0, 3.5, 1, 2],
  ["arm", "siphons-ticker", "Siphon's Ticker", 10, 1, 15, 0, 1, 0],
].map(([slot, id, name, hp, posture, reiatsu, defense, meterGain, reducedMeterDrain]) => ({
  slot,
  id,
  name,
  bonuses: { hp, posture, reiatsu, defense, meterGain, reducedMeterDrain, modeDuration: 0, specialDuration: 0 },
}));

const initialAccessoryState = Object.fromEntries(accessorySlots.map((slot) => [slot, ""]));

const state = {
  race: null,
  clan: null,
  clanSort: "default",
  accessories: { ...initialAccessoryState },
  hollowVariant: "base",
  quincyBlutVariant: false,
  quincyTrueBlut: false,
  shinigamiDefenseVariant: false,
};

const elements = {
  controlGroups: document.getElementById("control-groups"),
  statGrid: document.getElementById("stat-grid"),
  summary: document.getElementById("selected-summary"),
  raceSelect: document.getElementById("race-select"),
  clanSort: document.getElementById("clan-sort"),
  shareButton: document.getElementById("share-build"),
  resetButton: document.getElementById("reset-build"),
  optionCardTemplate: document.getElementById("option-card-template"),
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

function getSelectedAccessories() {
  return accessorySlots
    .map((slot) => accessories.find((accessory) => accessory.id === state.accessories[slot]))
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
    if (state.hollowVariant === "hierro") bonuses.defense += 12;
    if (state.hollowVariant === "ancient-vasto") {
      bonuses.regenPerSecond += 0.7;
    }
    if (clan?.id === "louisenbairn") {
      bonuses.defense += 2.5;
      if (state.hollowVariant === "hierro") {
        bonuses.defense += 5;
      }
    }
  }

  if (state.race === "quincy") {
    bonuses.defense += 10;
    if (state.quincyTrueBlut) bonuses.defense += 2;
    if (state.quincyBlutVariant) bonuses.defense += 4;
  }

  if (state.race === "shinigami" && state.shinigamiDefenseVariant) {
    bonuses.defense += 5;
  }

  return bonuses;
}

function calcStats() {
  const clan = getClan();
  const selectedAccessories = getSelectedAccessories();
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

  const totalBonus = Object.fromEntries(
    Object.keys(baseStats).map((key) => [
      key,
      (clanBonuses[key] ?? 0) + (accessoryBonuses[key] ?? 0) + (raceBuffBonuses[key] ?? 0),
    ])
  );

  const hp = baseStats.hp + totalBonus.hp;
  const defense = baseStats.defense + totalBonus.defense;
  const cappedDefense = Math.min(defense, 25);
  const regenPerSecond = baseStats.regenPerSecond + totalBonus.regenPerSecond;
  const effectiveHealth = Math.round((hp + regenPerSecond * 60) / Math.max(0.01, 1 - cappedDefense / 100));

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
    regenPerSecondBonus: totalBonus.regenPerSecond,
    meterGainBonus: totalBonus.meterGain,
    reducedMeterDrainBonus: totalBonus.reducedMeterDrain,
    modeDurationBonus: totalBonus.modeDuration,
    specialDurationBonus: totalBonus.specialDuration,
    specialLabel: clan?.specialLabel || specialLabelForRace(state.race),
  };
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
  header.innerHTML = `<h3>${title}</h3><span>${hint}</span>`;

  const grid = document.createElement("div");
  grid.className = "option-grid";

  if (locked) {
    const empty = document.createElement("article");
    empty.className = "selected-item";
    empty.innerHTML = "<strong>Clan Pool Locked</strong><span>Select a race.</span>";
    grid.appendChild(empty);
  }

  options.forEach((option) => {
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
  header.innerHTML = "<h3>Accessories</h3><span>One per slot</span>";

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
      option.textContent = accessory.name;
      if (state.accessories[slot] === accessory.id) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener("change", (event) => {
      state.accessories[slot] = event.target.value;
      syncUrl();
      rerender();
    });

    field.append(label, select);
    grid.appendChild(field);
  });

  section.append(header, grid);
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
        <option value="base">None</option>
        <option value="proficiency">Proficiency</option>
        <option value="hierro">Hierro Variant</option>
        <option value="ancient-vasto">Ancient Vasto</option>
      </select>`;
    field.querySelector("select").value = state.hollowVariant;
    grid.appendChild(field);
  }

  if (state.race === "quincy") {
    const blutVariant = document.createElement("label");
    blutVariant.className = "toggle-control";
    blutVariant.innerHTML = `<input type="checkbox" id="quincy-blut-variant" ${state.quincyBlutVariant ? "checked" : ""} /><span>Blut Variant (+4% Defense)</span>`;
    grid.appendChild(blutVariant);

    const trueBlut = document.createElement("label");
    trueBlut.className = "toggle-control";
    trueBlut.innerHTML = `<input type="checkbox" id="quincy-true-blut" ${state.quincyTrueBlut ? "checked" : ""} /><span>True Blut Essence (+2% Defense)</span>`;
    grid.appendChild(trueBlut);
  }

  if (state.race === "shinigami") {
    const defenseVariant = document.createElement("label");
    defenseVariant.className = "toggle-control";
    defenseVariant.innerHTML = `<input type="checkbox" id="shinigami-defense-variant" ${state.shinigamiDefenseVariant ? "checked" : ""} /><span>Defense Variant (+5% Defense)</span>`;
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
  if (key === "race") {
    state.race = state.race === id ? null : id;
    if (!getClanPool().some((clan) => clan.id === state.clan)) state.clan = null;
  } else {
    state.clan = state.clan === id ? null : id;
  }
  syncUrl();
  rerender();
}

function getTierLabel(key, value) {
  const thresholds = {
    hp: [5, 15, 25],
    effectiveHealth: [15, 40, 80],
    posture: [2, 5, 10],
    reiatsu: [5, 10, 20],
    defense: [1, 2, 4],
    regenPerSecond: [0.1, 0.4, 0.7],
    meterGain: [1, 3, 5],
    reducedMeterDrain: [1, 3, 5],
    modeDuration: [3, 5, 10],
    specialDuration: [3, 5, 10],
  };
  const [low, mid, high] = thresholds[key];
  if (value >= high) return "Top";
  if (value >= mid) return "Strong";
  if (value >= low) return "Useful";
  return "Base";
}

function renderStats() {
  const stats = calcStats();
  elements.statGrid.innerHTML = "";

  statDefinitions.forEach((definition) => {
    const label = definition.key === "specialDuration" ? stats.specialLabel : definition.label;
    const value = stats[definition.key];
    const bonus = stats[`${definition.key}Bonus`];
    const baseValue = baseStats[definition.key];
    const suffix = definition.suffix ?? "";
    const card = document.createElement("article");
    card.className = "stat-card";
    const meta =
      definition.key === "effectiveHealth"
        ? `Uses ${stats.cappedDefense}% defense cap | Bonus +${bonus}${suffix}`
        : definition.key === "defense"
          ? `Base ${baseValue}${suffix} | Bonus +${bonus}${suffix} | EHP uses ${stats.cappedDefense}%`
          : `Base ${baseValue}${suffix} | Bonus +${bonus}${suffix}`;
    card.innerHTML = `<span class="stat-label">${label}</span><div class="stat-value-row"><span class="stat-value">${value}${suffix}</span><span class="stat-tier">${getTierLabel(definition.key, bonus)}</span></div><div class="stat-meta">${meta}</div>`;
    elements.statGrid.appendChild(card);
  });
}

function renderSummary() {
  const race = getRace();
  const clan = getClan();
  const selectedAccessories = getSelectedAccessories();
  const raceBuffs = getRaceBuffBonuses();
  elements.summary.innerHTML = "";

  addSummaryCard("Race", race ? race.name : "None");
  addSummaryCard("Clan", clan ? `${clan.name} (${clan.rarity} | ${clan.dropRate})` : "None");
  addSummaryCard("Clan Passive", clan ? `${clan.passiveName}: ${clan.passive}` : "None");

  if (clan) {
    addSummaryCard("Clan Bonuses", formatBonuses(clan.bonuses, clan.specialLabel || specialLabelForRace(state.race)));
  }

  if (state.race && formatBonuses(raceBuffs) !== "No bonus") {
    addSummaryCard("Race Buffs", formatBonuses(raceBuffs, specialLabelForRace(state.race)));
  }

  if (selectedAccessories.length > 0) {
    selectedAccessories.forEach((accessory) => {
      addSummaryCard(`${titleCase(accessory.slot)} Accessory`, `${accessory.name} | ${formatBonuses(accessory.bonuses)}`);
    });
  } else {
    addSummaryCard("Accessories", "None");
  }
}

function addSummaryCard(title, text) {
  const card = document.createElement("article");
  card.className = "selected-item";
  card.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
  elements.summary.appendChild(card);
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.race) params.set("race", state.race);
  if (state.clan) params.set("clan", state.clan);
  if (state.clanSort !== "default") params.set("sort", state.clanSort);
  if (state.hollowVariant !== "base") params.set("hollowVariant", state.hollowVariant);
  if (state.quincyBlutVariant) params.set("quincyBlutVariant", "1");
  if (state.quincyTrueBlut) params.set("quincyTrueBlut", "1");
  if (state.shinigamiDefenseVariant) params.set("shinigamiDefenseVariant", "1");

  accessorySlots.forEach((slot) => {
    if (state.accessories[slot]) {
      params.set(slot, state.accessories[slot]);
    }
  });

  window.history.replaceState({}, "", `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`);
}

function loadStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
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
  state.quincyBlutVariant = params.get("quincyBlutVariant") === "1";
  state.quincyTrueBlut = params.get("quincyTrueBlut") === "1";
  state.shinigamiDefenseVariant = params.get("shinigamiDefenseVariant") === "1";

  accessorySlots.forEach((slot) => {
    const value = params.get(slot);
    if (getAccessoryOptions(slot).some((accessory) => accessory.id === value)) {
      state.accessories[slot] = value;
    }
  });
}

function resetBuild() {
  state.race = null;
  state.clan = null;
  state.clanSort = "default";
  state.accessories = { ...initialAccessoryState };
  state.hollowVariant = "base";
  state.quincyBlutVariant = false;
  state.quincyTrueBlut = false;
  state.shinigamiDefenseVariant = false;
  elements.clanSort.value = "default";
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
  elements.clanSort.value = state.clanSort;
  renderControls();
  renderStats();
  renderSummary();
}

elements.resetButton.addEventListener("click", resetBuild);
elements.shareButton.addEventListener("click", copyShareLink);
elements.raceSelect.addEventListener("change", (event) => {
  const nextRace = event.target.value || null;
  state.race = nextRace;
  if (!getClanPool().some((clan) => clan.id === state.clan)) state.clan = null;
  if (state.race !== "hollow") state.hollowVariant = "base";
  if (state.race !== "quincy") {
    state.quincyBlutVariant = false;
    state.quincyTrueBlut = false;
  }
  if (state.race !== "shinigami") state.shinigamiDefenseVariant = false;
  syncUrl();
  rerender();
});
elements.clanSort.addEventListener("change", (event) => {
  state.clanSort = event.target.value;
  syncUrl();
  rerender();
});

document.addEventListener("change", (event) => {
  if (event.target.id === "hollow-variant-select") {
    state.hollowVariant = event.target.value;
  }
  if (event.target.id === "quincy-blut-variant") {
    state.quincyBlutVariant = event.target.checked;
  }
  if (event.target.id === "quincy-true-blut") {
    state.quincyTrueBlut = event.target.checked;
  }
  if (event.target.id === "shinigami-defense-variant") {
    state.shinigamiDefenseVariant = event.target.checked;
  }
  if (
    ["hollow-variant-select", "quincy-blut-variant", "quincy-true-blut", "shinigami-defense-variant"].includes(
      event.target.id
    )
  ) {
    syncUrl();
    rerender();
  }
});

loadStateFromUrl();
rerender();
