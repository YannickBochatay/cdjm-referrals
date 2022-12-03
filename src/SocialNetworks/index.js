import Twitter from "./Twitter"
import Mastodon from "./Mastodon"
import Github from "./Github"

export default function SocialNetworks() {
    return (
        <div>
            <Mastodon/>
            &nbsp;
            <Twitter/>
            &nbsp;
            <Github/>
        </div>
    )
}