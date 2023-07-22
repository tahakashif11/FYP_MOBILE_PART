import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StripeProvider, CardField, Stripe } from '@stripe/stripe-react-native';

export default function Cartt() {
  const handlePayment = async () => {
    const token = await Stripe.createTokenWithCard({
      number: '4242424242424242',
      expMonth: 11,
      expYear: 23,
      cvc: '123',
    });
    console.log(token);
  };

  return (
    <StripeProvider publishableKey="pk_test_51MiGf3BnVuFOu736gPXWB83rj96rTbOt0VL1dEvgsZ0KaM1KcU7JH2jftmFde0w6YbUg7DglnRoMxxhBih1oPp3j00VO7sH7Ba">
      <View style={styles.container}>
        <Text>Enter your card information:</Text>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
          }}
        />
        <Button title="Pay" onPress={handlePayment} />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
