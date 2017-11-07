import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.codec.binary.Base64;

export GOOGLE_APPLICATION_CREDENTIALS="D:\Cloud\Google Drive\UniTN\TerzoAnno\IngegneriaSoftware2\Progetto\IngegneriaSoftware2\SE2\nbproject\private\serviceAccount.json"


public class HttpClient {

    public static void main(String args[]) throws IOException {
        private static final String TARGET_URL =
                "https://vision.googleapis.com/v1/images:annotate?";
        private static final String API_KEY =
                "key=AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI";

        URL serverUrl = new URL(TARGET_URL + API_KEY);
        URLConnection urlConnection = serverUrl.openConnection();
        HttpURLConnection httpConnection = (HttpURLConnection)urlConnection;

        httpConnection.setRequestMethod("POST");
        httpConnection.setRequestProperty("Content-Type", "application/json");

        httpConnection.setDoOutput(true);

        BufferedWriter httpRequestBodyWriter = new BufferedWriter(new
                OutputStreamWriter(httpConnection.getOutputStream()));
        httpRequestBodyWriter.write
                ("{\"requests\":  [{ \"features\":  [ {\"type\": \"LABEL_DETECTION\""
                        +"}], \"image\": {\"source\": { \"gcsImageUri\":"
                        +" \"gs://vision-sample-images/4_Kittens.jpg\"}}}]}");
        httpRequestBodyWriter.close();

        String response = httpConnection.getResponseMessage();

        if (httpConnection.getInputStream() == null) {
            System.out.println("No stream");
            return;
        }

        Scanner httpResponseScanner = new Scanner (httpConnection.getInputStream());
        String resp = "";
        while (httpResponseScanner.hasNext()) {
            String line = httpResponseScanner.nextLine();
            resp += line;
            System.out.println(line);  //  alternatively, print the line of response
        }
        httpResponseScanner.close();
        // read this input

    }
}