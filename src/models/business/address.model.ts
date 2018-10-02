import {Position} from "./position.model";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Address {

  @JsonProperty("addressOneLine", String, true)
  addressOneLine: string = undefined;

  @JsonProperty("zip", String, true)
  zip: string = undefined;

  @JsonProperty("city", String, true)
  city: string = undefined;

  @JsonProperty("state", String, true)
  state: string = undefined;

  @JsonProperty("position", Position, true)
  position: Position = undefined;

}
