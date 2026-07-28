import {Body, Controller, Headers, Param, Put, Res} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {Response} from 'express';
import {UpdateMenuParams} from 'Menu/Menu/Infrastructure/Controllers/UpdateMenu/UpdateMenuParams';
import {UpdateMenuApiRequest} from 'Menu/Menu/Infrastructure/Controllers/UpdateMenu/UpdateMenuApiRequest';
import {UpdateMenuCommand} from 'Menu/Menu/Application/UpdateMenu/UpdateMenuCommand';
import {MyBentoResponse} from 'Shared/Domain/MyBentoResponse';

@Controller()
export class UpdateMenuController {
    constructor(private readonly commandBus: CommandBus) {
    }

    @Put('/api/menus/:id')
    public async put(
        @Param() params: UpdateMenuParams,
        @Headers('traceId') traceId: string,
        @Body() body: UpdateMenuApiRequest,
        @Res() res: Response) {
        try {
            const command = UpdateMenuCommand.fromJson(params, body, traceId);

            await this.commandBus.execute(command);

            const response = new MyBentoResponse(null, {
                success: true,
                error: null
            });

            return res.status(200).json(response);
        } catch (error: any) {
            const errorResponse = new MyBentoResponse(null, {
                success: false,
                error: error.message
            });

            return res.status(400).json(errorResponse);
        }
    }
}
