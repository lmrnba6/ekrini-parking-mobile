import {JsonConverter, JsonCustomConvert} from "json2typescript";
import {RecurrenceEnum} from "../../models/business/recurrence.enum";


@JsonConverter
export class RecurrenceEnumConverter implements JsonCustomConvert<RecurrenceEnum> {
  serialize(enumValue: RecurrenceEnum): string {
    return RecurrenceEnum[enumValue];
  }

  deserialize(enumValue: string): RecurrenceEnum {
    return RecurrenceEnum[enumValue.toUpperCase()];
  }
}


