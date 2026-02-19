interface NameInputProps {
  name: string
  onNameChange: (name: string) => void
}

export default function NameInput({ name, onNameChange }: NameInputProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
        O teu nome
      </label>
      <div className="flex gap-3">
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Insere o teu nome..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-juni-purple focus:border-transparent"
        />
        <div className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold flex items-center">
          1 bilhete
        </div>
      </div>
    </div>
  )
}
