
import type { Configuration } from "./CreateService";

interface ConfigItemProp {
    config: Configuration
}

function ConfigurationItem ({ config }: ConfigItemProp) {

    return (
        <div>
            {config.key}
            {config.label}
            {config.type}
            {config.options.map(opt=>(
                <span>{opt.option}</span>
            ))}
        </div>
    )

}

export default ConfigurationItem;