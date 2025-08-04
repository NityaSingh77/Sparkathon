// emailApi.ts - API service for email functionality

const API_BASE_URL = 'http://localhost:5000/api';

export interface SuggestionData {
  id: string;
  fromStoreId: string;
  toStoreId: string;
  productName: string;
  quantity: number;
  reason: string;
  estimatedSavings: number;
  fromStore?: string;
  toStore?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

// Send approval email
export const sendApprovalEmail = async (
  suggestionData: SuggestionData, 
  approvedBy: string
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        suggestionData,
        approvedBy
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending approval email:', error);
    return {
      success: false,
      message: 'Failed to send approval email',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Send rejection email
export const sendRejectionEmail = async (
  suggestionData: SuggestionData, 
  rejectedBy: string
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        suggestionData,
        rejectedBy
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending rejection email:', error);
    return {
      success: false,
      message: 'Failed to send rejection email',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Send edit notification email
export const sendEditEmail = async (
  suggestionData: SuggestionData, 
  updatedBy: string
): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        suggestionData,
        updatedBy
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending edit email:', error);
    return {
      success: false,
      message: 'Failed to send edit notification email',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 