import { CheckCircle, CircleDashed, UserCog } from 'lucide-react'
import { Button } from '../../components/button'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../libs/axios'
import { Participant } from '../../types'

export function Guests() {
  const { tripId } = useParams()
  const [participants, setPartipants] = useState<Participant[]>([])

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setPartipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 max-w-64 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 flex-shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        <span>Gerenciar convidados</span>
      </Button>
    </div>
  )
}
