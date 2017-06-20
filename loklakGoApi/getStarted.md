This implements the API SDK for loklak server using golang. This is a Go client library for accessing the loklak API directly.

This is still a work in progress and hasn't been packaged into the loklak module yet. You can get this by doing

`go get github.com/loklak/loklak_api_go`

Installing
----------
Fetch the required dependencies

- `go get github.com/hokaccha/go-prettyjson`

Built in libraries that are being used are

- `net/http`
- `net/url`
- `fmt`
- `os`
- `encoding/json`

Documentation
-------------
The loklak api for go can be used in the following manner

```go
import "github.com/loklak/loklak_api_go"

func main() {
	loklakObject := new(Loklak)
	loklakObject.Connect("http://loklak.org/")
	// Note that the Connect step is necessary, you have to mention the loklak server you'd like to connect to.
	helloResponse := loklakObject.Hello()
	fmt.Println(helloResponse)
}
```
