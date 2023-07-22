import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SP_KEY } from '@env';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './screens/PaymentScreen';

const Elsee = () => {
  return (
    < StripeProvider
      publishableKey={SP_KEY}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <PaymentScreen />
    </StripeProvider >
  )
}

export default Elsee

const styles = StyleSheet.create({})
 