import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@Controller('test')
export class TestController {
  @Get()
  @ApiOperation({ summary: 'Test endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Returns a test message',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Test API is working!',
        },
      },
    },
  })
  getTest() {
    return { message: 'Test API is working!' };
  }
}
