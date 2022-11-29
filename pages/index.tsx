import { useEffect, useRef, useState } from "react"
import Button from "../components/shared/Button"

export default function Home() {
    const [content, setContent] = useState("")
    const [playing, setPlaying] = useState(false)
    const [current, setCurrent] = useState(0)
    const [bpm, setBpm] = useState(90)
    const [timer, setTimer] = useState<NodeJS.Timer>()
    const editorRef = useRef<HTMLDivElement>(null)
    const lines = content.split("\n").filter((line) => line.length > 0)

    useEffect(() => {
        if (playing) {
            setCurrent(0)
            setTimer(
                setInterval(() => {
                    setCurrent((curr) => curr + 1)
                }, 60000 / bpm)
            )
        } else {
            setCurrent(0)
            if (timer) {
                clearInterval(timer)
                setTimer(undefined)
            }
            if (editorRef.current) {
                editorRef.current.innerText = lines.join("\n")
            }
        }
        return () => {
            if (timer) {
                clearInterval(timer)
                setTimer(undefined)
            }
        }
    }, [playing])

    return (
        <div className="h-screen flex flex-col gap-2 items-center pt-10">
            <div className="flex gap-2 justify-center items-center">
                <span className="">
                    {Math.floor(current / 4)}:{current % 4}
                </span>
                BPM:{" "}
                <input
                    type="number"
                    className="text-end w-24 focus:ring-0 focus:outline-none rounded-xl border-2"
                    value={bpm}
                    onChange={(e) => setBpm(+e.target.value)}
                />
                <div></div>
                <Button
                    className="rounded w-24 bg-emerald-500 shadow text-white font-bold"
                    onClick={() => setPlaying((curr) => !curr)}
                >
                    {playing ? "Stop" : "Play"}
                </Button>
            </div>
            {playing && (
                <div className="p-2 flex items-center gap-4">
                    <div className="h-6"></div>
                    <div
                        className={`rounded-lg transition-all ${
                            current % 4 === 0
                                ? "w-6 h-6 bg-emerald-400 border-0 border-transparent"
                                : "w-5 h-5 bg-gray-500 border-1 border-transparent"
                        }`}
                    ></div>
                    <div
                        className={`rounded-lg transition-all ${
                            current % 4 === 1
                                ? "w-6 h-6 bg-emerald-400 border-0 border-transparent"
                                : "w-5 h-5 bg-gray-500 border-1 border-transparent"
                        }`}
                    ></div>
                    <div
                        className={`rounded-lg transition-all ${
                            current % 4 === 2
                                ? "w-6 h-6 bg-emerald-400 border-0 border-transparent"
                                : "w-5 h-5 bg-gray-500 border-1 border-transparent"
                        }`}
                    ></div>
                    <div
                        className={`rounded-lg transition-all ${
                            current % 4 === 3
                                ? "w-6 h-6 bg-emerald-400 border-0 border-transparent"
                                : "w-5 h-5 bg-gray-500 border-1 border-transparent"
                        }`}
                    ></div>
                    <div className="h-6"></div>
                </div>
            )}
            {playing ? (
                <div
                    key="output"
                    className="flex-1 overflow-auto w-[600px] max-w-[100vw] focus:outline-0 ring-0 decoration-transparent focus:ring-0 focus:border-0 p-3"
                >
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className={`${
                                Math.floor(i / 4) === Math.floor(current / 16)
                                    ? "text-emerald-500"
                                    : ""
                            } ${
                                i === Math.floor(current / 4) ? "font-bold" : ""
                            }`}
                        >
                            {line}
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    key="editor"
                    className={`${
                        playing ? "hidden" : ""
                    } flex-1 overflow-auto w-[600px] max-w-[100vw] focus:outline-0 ring-0 decoration-transparent focus:ring-0 focus:border-0 p-3`}
                    //contentEditable={!playing}
                    contentEditable
                    ref={editorRef}
                    onInput={(e) => setContent(e.currentTarget.innerText)}
                ></div>
            )}
        </div>
    )
}
