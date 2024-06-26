import TestSystemActorBase from "./base-actor.mjs";
export default class TestSystemCharacter extends TestSystemActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.attributes = this.createSchemaField({
      level: this.createSchemaField({
        value: this.createRequiredNumberField(1)
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.TEST_SYSTEM.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: this.createRequiredNumberField(10, 0),
      });
      return obj;
    }, {}));

    schema.age = this.createRequiredNumberField(25, 18);
    schema.species = this.createRequiredStringField();
    schema.nation = this.createRequiredStringField();
    schema.profession = this.createRequiredStringField();

    schema.tricks = this.createSchemaField({
      firstTrick: this.createRequiredStringField(),
      secondTrick: this.createRequiredStringField(),
      thirdTrick: this.createRequiredStringField()
    });

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.TEST_SYSTEM.abilities[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k, v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }
}