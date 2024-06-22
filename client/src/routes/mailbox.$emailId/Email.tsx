import { useParams } from "react-router-dom"
import { EmailHeader } from "./components/email-header"
import { useGetEmailQuery } from "./gql/get-email.operation"

export const Email = () => {
  const { emailId } = useParams()
  const { data, loading, error } = useGetEmailQuery({
    variables: {
      id: emailId ?? "",
    },
  })
  if (loading || data === undefined) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const email = data.email
  return (
    email && (
      <div>
        <EmailHeader email={email} />
        <div
          className="bg-white shadow-md rounded-lg px-4 m-4 border border-gray-200"
          dangerouslySetInnerHTML={{
            __html: email.html ?? email.textAsHtml ?? email.text ?? "",
          }}
        />
      </div>
    )
  )
}
