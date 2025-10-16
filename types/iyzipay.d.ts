declare module 'iyzipay' {
  export default class Iyzipay {
    constructor(options: {
      apiKey: string
      secretKey: string
      uri: string
    })

    static LOCALE: {
      TR: string
      EN: string
    }

    static CURRENCY: {
      TRY: string
      EUR: string
      USD: string
    }

    static PAYMENT_GROUP: {
      PRODUCT: string
      LISTING: string
      SUBSCRIPTION: string
    }

    static BASKET_ITEM_TYPE: {
      PHYSICAL: string
      VIRTUAL: string
    }

    checkoutFormInitialize: {
      create: (request: any, callback: (err: any, result: any) => void) => void
    }

    checkoutForm: {
      retrieve: (request: any, callback: (err: any, result: any) => void) => void
    }
  }
}
