import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from '../types/jwtPayload.type'
import { User } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // JWT認証の設定
    super({
      // リクエストのどの部分にトークンを設定するか
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期限切れのトークンを使用できるかどうか
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload): Promise<User | null> {
    return await this.userService.getUser(payload.email)
  }
}
