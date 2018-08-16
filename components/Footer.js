import Link from "next/link";

const hrStyle = {
    marginTop: 75
};

const Footer = () => (
    <div>
        <hr style={hrStyle} />
        <p>
            👋 Woop there it is... Job data in your face{" "}
            <Link href="mailto:hello@murraywilliams.co.za?subject=I+Need+Some+Magic+Please">
                <a>Say what?!?</a>
            </Link>
        </p>
    </div>
);

export default Footer;
