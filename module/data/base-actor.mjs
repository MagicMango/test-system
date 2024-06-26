import TestSystemDataModel from "./base-model.mjs";
const { NumberField, SchemaField, StringField, DataField } = foundry.data.fields;

export default class TestSystemActorBase extends TestSystemDataModel {

  static defineSchema() {
    const schema = {};

    schema.health = this.createSchemaField({
      value: this.createRequiredNumberField(10, 0),
      max: this.createRequiredNumberField(10)
    });
    schema.power = this.createSchemaField({
      value: this.createRequiredNumberField(5, 5),
      max: this.createRequiredNumberField(5)
    });
    schema.biography = this.createRequiredStringField();
    

    return schema;
  }

  /** @param {string} value   **/
  static createRequiredStringField(value) {
    const requiredString = { required: true, nullable: false };
    var initialValue = value || "";
    return new StringField({ ...requiredString, initial: initialValue  });
  }

  /** 
   * @param {number} initial
   * @param {number} min
   * @returns {NumberField}
   * **/
  static createRequiredNumberField(initial, min) {
    const requiredInteger = { required: true, nullable: false, integer: true };
    var initialValue = initial || 0;
    var minValue = min;
    return new NumberField({ ...requiredInteger, initial: initialValue, min: minValue });
  }

  /** 
   * @param {{[key: string]: DataField}} schemaFieldObject
   * @returns {SchemaField}
   * **/
  static createSchemaField(schemaFieldObject) {
    return new SchemaField(schemaFieldObject);
  }

}