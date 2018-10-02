import {JsonObject, JsonProperty} from "json2typescript";
import {Address} from "./address.model";
import {UserProfile} from "./user-profile.model";
import {RecurrenceEnum} from "./recurrence.enum";
import {Position} from "./position.model";
import {RecurrenceEnumConverter} from "../../util/json-converter/recurrence-enum-converter";

@JsonObject
export class Parking {

  @JsonProperty("id", Number, true)
  id: number = undefined;

  @JsonProperty("user", UserProfile, true)
  user: UserProfile = undefined;

  @JsonProperty("address", Address, true)
  address: Address = undefined;

  @JsonProperty("number", String, true)
  number: string = undefined;

  @JsonProperty("size", String, true)
  size: string = undefined;

  @JsonProperty("price", Number, true)
  price: number = undefined;

  @JsonProperty("comment", String, true)
  comment: string = undefined;

  @JsonProperty("position", Position, true)
  position: Position = undefined;

  @JsonProperty("timeStart", String, true)
  timeStart: number = undefined;

  @JsonProperty("timeEnd", String, true)
  timeEnd: number = undefined;

  @JsonProperty("date", String, true)
  date: number = undefined;

  @JsonProperty("recurrence", RecurrenceEnumConverter, true)
  recurrence: RecurrenceEnum = undefined;

  @JsonProperty("imageUrl", String, true)
  imageUrl: string = undefined;

}

