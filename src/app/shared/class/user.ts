export class User {
  static PROFILE_TYPE_TEACHER = 'teacher';
  static PROFILE_TYPE_STUDENT = 'student';
  static PROFILE_TYPE_OTHER = 'other';
  static AGE_MIN_REQUIRED = 13;
  static REGEX_PASSWORD = /[0-9a-zA-Z]{6,}/;

  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    private _userName: string,
    private _dateOfBirth: Date,
    private _email: string,
    private _password: string,
    private _profileType: string,
  ) {}

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

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

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  static getProfilesType(): Array<string> {
    return [this.PROFILE_TYPE_TEACHER, this.PROFILE_TYPE_STUDENT, this.PROFILE_TYPE_OTHER];
  }
}
