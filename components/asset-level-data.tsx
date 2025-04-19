export function AssetLevelData() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-5">Asset-Level Data</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <div className="p-3">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 21V9" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Clear Heights</div>
                <div className="text-xl font-bold">36'</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 3H4a1 1 0 00-1 1v16a1 1 0 001 1h5M9 3v18M9 3h6M9 21h6m0-18h5a1 1 0 011 1v16a1 1 0 01-1 1h-5m0-18v18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Column Spacing</div>
              <div className="text-xl font-bold">63' X 54'</div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 5h14M5 5v14M5 5L19 19M19 5v14M19 19H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Parking Spaces</div>
              <div className="text-xl font-bold">393</div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M8 12h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground"># of Dock Doors</div>
              <div className="text-xl font-bold">28</div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Tenant</div>
              <div className="text-xl font-bold">Amazon</div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Covenant Area</div>
              <div className="text-xl font-bold">357,151 sqft</div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Year Built</div>
              <div className="text-xl font-bold">2021</div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Occupancy Rate</div>
              <div className="text-xl font-bold">100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
