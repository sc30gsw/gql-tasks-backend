import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

// ローカルストレージ用のAuthGuardとするため親クラスの引数にlocalを渡す
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super()
  }

  // RestAPI用のgetRequestメソッドをgqlでも扱えるようオーバーライド
  getRequest(context: ExecutionContext) {
    // GraphQL用の実行コンテキストを作成
    const ctx = GqlExecutionContext.create(context)
    // リクエスト情報取得
    const request = ctx.getContext()
    request.body = ctx.getArgs().signInInput

    return request
  }
}
