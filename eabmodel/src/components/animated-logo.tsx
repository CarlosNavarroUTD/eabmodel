'use client'

export default function AnimatedLogo() {
  return (
    <div className="relative w-[300px] h-[300px]">
      {/* Orbital rings */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Orbit 1 (outermost) */}
          <g className="animate-spin-orbit1">
            <path
              d="M 50,5 A 45,45 0 0,1 95,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 50,95 A 45,45 0 0,1 5,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
          </g>

          {/* Orbit 2 */}
          <g className="animate-spin-orbit2">
            <path
              d="M 50,15 A 35,35 0 0,1 85,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 50,85 A 35,35 0 0,1 15,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 85,50 A 35,35 0 0,1 50,85"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
          </g>

          {/* Orbit 3 */}
          <g className="animate-spin-orbit3">
            <path
              d="M 50,20 A 30,30 0 0,1 80,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 80,50 A 30,30 0 0,1 50,80"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
          </g>

          {/* Orbit 4 */}
          <g className="animate-spin-orbit4">
            <path
              d="M 50,25 A 25,25 0 0,1 75,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 75,50 A 25,25 0 0,1 50,75"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 50,75 A 25,25 0 0,1 25,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
          </g>

          {/* Orbit 5 */}
          <g className="animate-spin-orbit5">
            <path
              d="M 50,30 A 20,20 0 0,1 70,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 70,50 A 20,20 0 0,1 50,70"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
          </g>

          {/* Orbit 6 (innermost) */}
          <g className="animate-spin-orbit6">
            <path
              d="M 50,35 A 15,15 0 0,1 65,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 65,50 A 15,15 0 0,1 50,65"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
            <path
              d="M 50,65 A 15,15 0 0,1 35,50"
              fill="none"
              stroke="#efb810"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {/* Logo text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="relative text-6xl font-bryndan text-white font-custom">
          <span className="absolute inset-0 bg-white/1 backdrop-blur-lg rounded-lg p-2"></span>
          <span className="relative">EABMODEL</span>
        </h1>
      </div>
    </div>
  )
}