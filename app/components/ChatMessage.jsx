export default function ChatMessage({ message }) {
    const { type, content } = message;
    
    return (
      <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div 
          className={`p-3 rounded-lg max-w-[80%] ${
            type === 'user' 
              ? 'bg-nav text-black' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {content}
        </div>
      </div>
    );
}