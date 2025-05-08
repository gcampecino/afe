import TermsConditionsForm from 'app/components/TermsConditionsForm';
import { param } from 'framer-motion/client';
//import { useRouter } from 'next/router'


export default async function Register({
  params
}: {
  params: Promise<{ profileId: string }>
}) {

  const profileId = (await params).profileId;

  return (
    <>
      <TermsConditionsForm profileId={profileId}></TermsConditionsForm>
    </>
  );
  // The rest of your form goes here
} 