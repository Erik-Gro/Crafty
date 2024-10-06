import { useGetSubscription } from "../api/useGetSubscription";
import { useSubscriptionModal } from "../store/useSubscriptionModal";

export const usePaywall = () => {
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = isLoadingSubscription || !subscription?.active;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
