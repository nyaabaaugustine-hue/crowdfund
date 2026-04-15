// Paystack API Integration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_BASE_URL = 'https://api.paystack.co'

interface PaystackResponse<T> {
  status: boolean
  message: string
  data: T
}

interface InitializeTransactionResponse {
  authorization_url: string
  access_code: string
  reference: string
}

interface VerifyTransactionResponse {
  id: number
  amount: number
  currency: string
  status: string
  reference: string
  paid_at: string
  customer: {
    email: string
    id: number
  }
  channel: string
}

export async function initializeTransaction(params: {
  email: string
  amount: number // in kobo (GHS * 100)
  reference?: string
  currency?: string
  callback_url?: string
  metadata?: Record<string, unknown>
}) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      reference: params.reference,
      currency: params.currency || 'GHS',
      callback_url: params.callback_url,
      metadata: params.metadata,
    }),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to initialize transaction')
  }

  return data as PaystackResponse<InitializeTransactionResponse>
}

export async function verifyTransaction(reference: string) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to verify transaction')
  }

  return data as PaystackResponse<VerifyTransactionResponse>
}

export async function chargeAuthorization(params: {
  email: string
  amount: number
  authorization_code: string
  reference?: string
  currency?: string
}) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/charge_authorization`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      authorization_code: params.authorization_code,
      reference: params.reference,
      currency: params.currency || 'GHS',
    }),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to charge authorization')
  }

  return data as PaystackResponse<VerifyTransactionResponse>
}

export async function listBanks() {
  const response = await fetch(`${PAYSTACK_BASE_URL}/bank`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  })

  return response.json()
}

export async function resolveAccountNumber(params: {
  account_number: string
  bank_code: string
}) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/bank/resolve?account_number=${params.account_number}&bank_code=${params.bank_code}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  })

  return response.json()
}

export async function initiateTransfer(params: {
  source: string
  amount: number
  recipient: string
  reference?: string
  reason?: string
}) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transfer`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: params.source,
      amount: params.amount,
      recipient: params.recipient,
      reference: params.reference,
      reason: params.reason,
    }),
  })

  return response.json()
}

export default {
  initializeTransaction,
  verifyTransaction,
  chargeAuthorization,
  listBanks,
  resolveAccountNumber,
  initiateTransfer,
}
