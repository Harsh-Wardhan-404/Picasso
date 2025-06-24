import { useState } from 'react';
import { X, Users, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { HTTP_BACKEND } from '@/config';

interface JoinProps {
    onClose: () => void;
    socket: WebSocket
    // onJoin: (roomCode: string) => void;
}

export function Join({ onClose, socket }: JoinProps) {
    const [roomCode, setRoomCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!roomCode.trim()) return;

        setIsLoading(true);
        setError('');
        try {
            if (roomCode) {
                const res = await axios.get(`${HTTP_BACKEND}/isRoom/${roomCode}`);
                if (res.data.success) {
                    socket.send(JSON.stringify({
                        type: "join_room",
                        roomId: roomCode
                    }))
                    window.location.href = `/canvas/${roomCode}`;
                } else {
                    setError('Room not found. Please check the code and try again.');
                    // Focus the input for better UX
                    document.getElementById('roomCode')?.focus();
                }
            }
            return;
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Semi-transparent backdrop with blur */}
            <div
                className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal content */}
            <div className="relative bg-gray-900 border border-purple-500/20 p-8 rounded-2xl shadow-2xl max-w-md w-full">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-purple-900/20 rounded-full p-3 w-fit mx-auto mb-4">
                        <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Join Room</h2>
                    <p className="text-gray-400">Enter the room code to join a collaborative session</p>
                </div>
                {error && (
                    <div className="text-red-400 text-sm mt-2 bg-red-900/20 p-2 rounded-md">
                        {error}
                    </div>
                )}
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="roomCode" className="block text-sm font-medium text-gray-300 mb-2">
                            Room Code
                        </label>
                        <input
                            id="roomCode"
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            placeholder="Enter room code..."
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            // maxLength={1}
                            autoFocus
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold transition-all duration-300 hover:border-gray-500 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!roomCode.trim() || isLoading}
                            className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Join
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-6 pt-6 border-t border-gray-700">
                    <p className="text-gray-400 text-sm">
                        Don&apos;t have a room code?{" "}
                        <button className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                            Create a new room
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}