import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class UserProfile {

  @JsonProperty("id", Number)
  id: number = undefined;

  @JsonProperty("name", String)
  name: string = undefined;

  @JsonProperty("username", String)
  username: string = undefined;

  @JsonProperty("email", String)
  email: string = undefined;

  @JsonProperty("roles", [String], true)
  roles: string[] = undefined;

  isAdmin() {
    return this.roles.find(role => role === 'ROLE_ADMIN')
  }

}
