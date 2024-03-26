import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PermissionGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.user.moduleUrlList) {
      return false;
    }

    const currentUrl = request.url;

    const regex = new RegExp('/api/v[0-9]');

    const editedUrl = currentUrl.replace(regex, '');

    return this.matchUrlAddresses(request.user.moduleUrlList, editedUrl);
  }

  private matchUrlAddresses(moduleUrlList: string[], url: string): boolean {
    return moduleUrlList.includes(url);
  }
}
