import {Body, Controller, Headers, Post, Res} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {Response} from 'express';
import {CreateMenuApiRequest} from 'Menu/Menu/Infrastructure/Controllers/CreateMenu/CreateMenuApiRequest';
import {CreateMenuCommand} from 'Menu/Menu/Application/CreateMenu/CreateMenuCommand';
import {MyBentoResponse} from 'Shared/Domain/MyBentoResponse';

@Controller()
export class CreateMenuController {
    constructor(private readonly commandBus: CommandBus) {
    }
    
    @Post('/api/menus')
    public async post(
        @Headers('traceId') traceId: string,
        @Body() body: CreateMenuApiRequest,
        @Res() res: Response) {
        try {
            const command = CreateMenuCommand.fromJson(body, traceId);
            
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