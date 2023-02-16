import { loadStripe } from "@stripe/stripe-js";

//@ts-ignorets
//
export async function checkout({lineItems}) {
   let stripPromise: any =  null;
   
    const getStripe = () => {
      if (!stripPromise) {
        stripPromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY || 'pk_live_AJyJNo8T0ZMvFJAuggYh2VKA')
      } 
      return stripPromise;
    }
    const stripe = await getStripe();
    try {
      await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl: `${window.location.origin}/create-job?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/create-job`,
      });
    } catch(err) {
      console.error('Something went wrong');
    }
}