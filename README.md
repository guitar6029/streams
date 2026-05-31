# Node.js Streams

## Concepts

- Readable Streams
- Writable Streams
- Backpressure
- Chunk vs Row Processing
- Buffer Management
- Transform Streams
- Gzip Compression
- HTTP Streaming
- Stream Pipelines

---

## 01 Basics

### Topics

- Creating writable streams
- Creating readable streams
- File copy streams
- Manual backpressure handling
- `pause()`, `resume()`, and `drain()`

### Exercises

- Writing 1 million records
- File copy streams
- Backpressure handling

---

## 02 Payment Transform

Transforms client payment CSVs into an internal format.

### Pipeline

Parse
→ Sanitize
→ Validate
→ Normalize
→ Format
→ Write

### Concepts

- Chunk processing
- Row extraction from chunks
- Buffer accumulation
- Partial row handling
- CSV ingestion pipelines
- Data validation
- Data sanitization
- Data normalization

### Example

Input:

1001, acme corp ,$1250.50,4/15/2026,paid

Output:

1001,ACME CORP,125050,2026-04-15,PAID

---

## 03 Gzip

### Topics

- Large file generation
- Gzip compression
- Compression metrics
- Throughput measurement
- File streaming
- HTTP response streaming

### File Compression Pipeline

File
→ Readable Stream
→ Gzip Transform
→ Writable Stream

### HTTP Download Pipeline

File
→ Readable Stream
→ Gzip Transform
→ HTTP Response

### Metrics Collected

- Input bytes
- Output bytes
- Compression ratio
- Throughput (MB/s)
- Compression duration

### Example Results

Input: ~106 MB

Output: ~14.6 MB

Reduction: ~86%

Compression Time: ~1.7 seconds

### Key Takeaways

- Streams process data incrementally rather than loading entire files into memory.
- Transform streams sit between producers and consumers.
- `pipe()` automatically handles backpressure.
- HTTP requests and responses are streams.
- Large downloads keep the HTTP connection open while data is transferred.
- Headers are sent before the response body is fully streamed.
