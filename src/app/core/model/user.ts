export interface UserInterface {
  id: number;
  email: string;
  dateOfBirth?: Date;
  username: string;
  password: string;
  profileType: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements UserInterface {
  static PROFILE_TYPE_TEACHER = 'teacher';
  static PROFILE_TYPE_STUDENT = 'student';
  static PROFILE_TYPE_OTHER = 'other';
  static AGE_MIN_REQUIRED = 13;
  static REGEX_PASSWORD = /[0-9a-zA-Z]{6,}/;

  static PROFILES = {
    [User.PROFILE_TYPE_TEACHER]: 'Enseignant',
    [User.PROFILE_TYPE_STUDENT]: 'Étudiant',
    [User.PROFILE_TYPE_OTHER]: 'Autre',
  };

  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _username: string;
  private _dateOfBirth?: Date;
  private _email: string;
  private _password: string;
  private _profileType: string;

  constructor() {}

  public makeUser(user: UserInterface) {
    Object.assign(this, user);
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
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
}
