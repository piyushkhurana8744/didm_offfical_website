# DIDM queue state comparison

| State | Captured | Pending | Visited | Blocked inventory records | Snapshot matches |
|---|---:|---:|---:|---:|---:|
| Verified preflight | 2 | 65 | 3 | 1 | 2/2 |
| Broken forensic copy | 2 | 0 | 68 | 66 | 2/2 |
| Repaired current state | 2 | 65 | 3 | 1 | 2/2 |

## State hashes

| File | Before repair (broken) | After repair |
|---|---|---|
| `checkpoint.json` | `578a3b3dec4de3887c0e5407ff60c3c786c924e31c72a33ad03016a126a5816d` | `228676a09f9cedb0b16d5b4a6a32bb1128f979d186bcbdab03f04c0c9605cbf3` |
| `url_inventory.csv` | `1a50222983103ed9ca76309e51139c8f42b69341698a4f3b1d26176cda9cba99` | `87183411d01b6c145b2960ee255b6240829ecf989ce514fba338136688a03fa0` |

Raw snapshots and page records were identical throughout. The restore audit is
available in `queue_restore_audit.json`.

