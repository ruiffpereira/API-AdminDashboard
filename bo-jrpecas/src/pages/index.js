import { checkSession } from '@/utils/checkSession'

export default function Home() {}

export async function getServerSideProps(context) {
  const sessionCheckResult = await checkSession(context.req)
  if (sessionCheckResult.redirect) {
    return sessionCheckResult
  }

  return {
    redirect: {
      destination: '/dashboard',
      permanent: false,
    },
  }
}
