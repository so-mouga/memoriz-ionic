export class User {

  static PROFILE_TYPE_TEACHER = 'teacher';
  static PROFILE_TYPE_STUDENT = 'student';
  static PROFILE_TYPE_OTHER   = 'other';
  static AGE_MIN_REQUIRED     = 13;
  static REGEX_PASSWORD       = /[0-9a-zA-Z]{6,}/;

  constructor(
    private _userName: string,
    private _dateOfBirth: Date,
    private _email: string,
    private _password: string,
    private _profileType: string,
  ) {}

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  get profileType(): string {
    return this._profileType;
  }

  set profileType(value: string) {
    this._profileType = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  static getProfilesType(): Array<string> {
    return [
      this.PROFILE_TYPE_TEACHER,
      this.PROFILE_TYPE_STUDENT,
      this.PROFILE_TYPE_OTHER,
    ];
  }
}
