import Background from '@renderer/components/Background'
import AuthForm from '@renderer/components/user/AuthForm'

interface AuthProps {
  type: string
}

const Auth: React.FC<AuthProps> = ({ type }) => {
  return (
    <Background>
      <section className="grid place-items-center h-full w-full">
        <AuthForm type={type} />
      </section>
    </Background>
  )
}

export default Auth
