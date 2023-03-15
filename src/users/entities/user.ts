export interface UserProps {
  id: string;
  email: string;
  password?: string | null;
  name: string;
  picture?: string | null;
  provider?: string | null;
  providerId?: string | null;
  refreshToken: string | null;
  createdAt?: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  public get id(): string {
    return this.props.id;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email() {
    return this.props.email;
  }

  public set password(password: string | undefined | null) {
    this.props.password = password;
  }

  public get password(): string | undefined | null {
    return this.props.password;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  public set picture(picture: string | undefined | null) {
    this.props.picture = picture;
  }

  public get picture(): string | undefined | null {
    return this.props.picture;
  }

  public set provider(provider: string | undefined | null) {
    this.props.provider = provider;
  }

  public get provider(): string | undefined | null {
    return this.props.provider;
  }

  public set providerId(providerId: string | undefined | null) {
    this.props.providerId = providerId;
  }

  public get providerId(): string | undefined | null {
    return this.props.providerId;
  }

  public set refreshToken(refreshToken: string | null) {
    this.props.refreshToken = refreshToken;
  }

  public get refreshToken(): string | null {
    return this.props.refreshToken;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
}
