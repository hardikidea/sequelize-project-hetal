// BaseController.ts

import { Response } from 'express';

export abstract class BaseController {
    // Send a success response
    sendSuccess(data: unknown, statusCode: number = 200) {
        console.log('success')
        return async (response: Response) => {
            try {
                console.log('Data:', data)
                return response.status(statusCode).json({ success: true, data,});
            } catch (error) {
              console.error('Error fetching records:', error);
              response.status(500).send('Internal Server Error');
            }
        }
    }
    
}
