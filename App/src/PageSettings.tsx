import './giga.css';
import GrayscaleSlider from "./components/GrayscaleSlider";
import pal from "./Palantir";

function PageSettings() {
    return (
        <div className='SettingsPage'>
            <div style={styles.container}> {/* needed for style baground */}

                {/* Custom range slider */}
                <GrayscaleSlider />

                <p className="text-4xl font-bold mb-4 text-white">
                    thisTestMail@mail.com
                </p>

                <p className="text-4xl font-bold mb-4 text-white">
                    password : ****
                </p>

                <p className="text-4xl font-bold mb-4 text-white">
                    <button className="button buttonGreen">logout</button>
                </p>

                <p className="text-4xl font-bold mb-4 text-white">
                    (hiden)
                    thisTestMail@mail.com <button className="button buttonRed">logout</button>
                </p>

                <button className="button buttonRed" onClick={pal.exportData}>Export data</button>
            </div>
        </div> // needed for style baground
    );
}


const styles = {
    container: {
        backgroundColor: "#ff00e6",
    },
} as const;

export default PageSettings;

