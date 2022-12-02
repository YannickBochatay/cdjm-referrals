import Twitter from "./Twitter";
import Mastodon from "./Mastodon"

export default function SocialNetworks() {
    return (
        <div>
            <Mastodon/>
            &nbsp;
            <Twitter/>
        </div>
    )
}